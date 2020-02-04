/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

import { makeMap, no } from 'shared/util'
import { isNonPhrasingTag } from 'web/compiler/util'

// Regular Expressions for parsing tags and attributes 匹配属性
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
const ncname = '[a-zA-Z_][\\w\\-\\.]*' //ncname 的全称是 An XML name that does not contain a colon (:) 即：不包含冒号(:)的 XML 名称。
const qnameCapture = `((?:${ncname}\\:)?${ncname})` //qname 就是：<前缀:标签名称>，也就是合法的XML标签
const startTagOpen = new RegExp(`^<${qnameCapture}`) //< 以及后面的 标签名称
const startTagClose = /^\s*(\/?)>/ //匹配>、/>,会捕获/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i
// #7298: escape - to avoid being pased as HTML comment when inlined in page
const comment = /^<!\--/ //匹配注释
const conditionalComment = /^<!\[/ //这个正则用来匹配条件注释节点

// Special Elements (can contain anything)
export const isPlainTextElement = makeMap('script,style,textarea', true) //用来检测给定的标签是否是script,style,textarea
const reCache = {}

const decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
}
const encodedAttr = /&(?:lt|gt|quot|amp);/g
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g

// #5992
const isIgnoreNewlineTag = makeMap('pre,textarea', true)
const shouldIgnoreFirstNewline = (tag, html) => tag && isIgnoreNewlineTag(tag) && html[0] === '\n'

function decodeAttr (value, shouldDecodeNewlines) {
  const re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr
  return value.replace(re, match => decodingMap[match])
}

export function parseHTML (html, options) {
  const stack = []
  const expectHTML = options.expectHTML
  const isUnaryTag = options.isUnaryTag || no
  const canBeLeftOpenTag = options.canBeLeftOpenTag || no
  let index = 0 //当前索引
  let last, lastTag 
  //last保留上一次html文本
  //lastTag上一次解析的标签
	
	// 开启一个 while 循环，循环结束的条件是 html 为空，即 html 被 parse 完毕
  while (html) {
    last = html 
    // Make sure we're not in a plaintext content element like script/style
		// 确保即将 parse 的内容不是在纯文本标签里 (script,style)
    if (!lastTag || !isPlainTextElement(lastTag)) {
      let textEnd = html.indexOf('<')
      if (textEnd === 0) { //解析到<开始
        // Comment:
        if (comment.test(html)) { //从开始匹配到了<!--
          const commentEnd = html.indexOf('-->') //找结束位置

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) { //要不要保留注释节点
              options.comment(html.substring(4, commentEnd)) //在ast上添加该注释节点
            }
            advance(commentEnd + 3) //更改index，解析的html赋值为截取后的html
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        //条件注释
        if (conditionalComment.test(html)) {
          const conditionalEnd = html.indexOf(']>')

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2)
            continue
          }
        }

        // Doctype:
        const doctypeMatch = html.match(doctype)
        if (doctypeMatch) {
          advance(doctypeMatch[0].length)
          continue
        }

        // End tag:
        const endTagMatch = html.match(endTag)
        if (endTagMatch) {
          const curIndex = index
          advance(endTagMatch[0].length)
          parseEndTag(endTagMatch[1], curIndex, index)
          continue
        }

        // Start tag:
        const startTagMatch = parseStartTag()
        if (startTagMatch) {
          handleStartTag(startTagMatch)
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1)
          }
          continue
        }
      }

      let text, rest, next
      if (textEnd >= 0) { //解析到不以<开始，例如：{{ass}}<div>
        rest = html.slice(textEnd) //就把前面截取出来，{{ass}}
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) { //截取出来的字符串有没有结束标签、开始标签、注释、条件注释
          // < in plain text, be forgiving and treat it as text
          //有<在纯文本里面，看成是文本对待
          next = rest.indexOf('<', 1)
          if (next < 0) break
          textEnd += next
          rest = html.slice(textEnd)
        }
        text = html.substring(0, textEnd)
        advance(textEnd)
      }

      if (textEnd < 0) {
        text = html
        html = ''
      }

      if (options.chars && text) {
        options.chars(text)
      }
    } else { //script,style
      let endTagLength = 0
      const stackedTag = lastTag.toLowerCase()
      const reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'))
      const rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1')
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1)
        }
        if (options.chars) {
          options.chars(text)
        }
        return ''
      })
      index += html.length - rest.length
      html = rest
      parseEndTag(stackedTag, index - endTagLength, index)
    }

    if (html === last) {
      options.chars && options.chars(html)
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(`Mal-formatted tag at end of template: "${html}"`)
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag()

  function advance (n) {
    index += n
    html = html.substring(n)
  }

  function parseStartTag () {
    const start = html.match(startTagOpen) //匹配标签
    if (start) {
      const match = {
        tagName: start[1], //标签名
        attrs: [],
        start: index
      }
      advance(start[0].length) //前进到标签名后
      let end, attr
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        //html.match(startTagClose)匹配从当前开始>、/>,如果没匹配上则后面是属性，则匹配属性
        advance(attr[0].length)
        match.attrs.push(attr)
      }
      if (end) {
        match.unarySlash = end[1] //end捕获了/>的/，可以根据unarySlash判断是单标签还是双标签
        advance(end[0].length) //前进到结束标签尾部
        match.end = index //结束索引
        return match
      }
    }
  }

  function handleStartTag (match) {
    const tagName = match.tagName
    const unarySlash = match.unarySlash

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag)
      }
      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag(tagName)
      }
    }

    const unary = isUnaryTag(tagName) || !!unarySlash //是否单标签

    const l = match.attrs.length
    const attrs = new Array(l)
    for (let i = 0; i < l; i++) {
      const args = match.attrs[i]
      const value = args[3] || args[4] || args[5] || '' //args[3]、args[4]、args[5]为匹配属性捕获的，捕获属性的不同写法，只有一个里面有值
      const shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines //是否需要转义
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      }
    }

    if (!unary) { //不是单标签，放进stack里面
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs })
      lastTag = tagName
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end)
    }
  }

  function parseEndTag (tagName, start, end) {
    let pos, lowerCasedTagName
    if (start == null) start = index
    if (end == null) end = index

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase()
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) { //找stack里面有没有该tagname，有就break
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (let i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) { //如果找到结束标签，pos应该是stack的length-1，i会等于pos
          //如果不是，则说明中间有没有结束标签的tag
          options.warn(
            `tag <${stack[i].tag}> has no matching end tag.`
          )
        }
        if (options.end) {
          options.end(stack[i].tag, start, end)
        }
      }

      // Remove the open elements from the stack
      //把该解析完结束标签的元素从stack中移除
      stack.length = pos
      lastTag = pos && stack[pos - 1].tag
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end)
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end)
      }
      if (options.end) {
        options.end(tagName, start, end)
      }
    }
  }
}
