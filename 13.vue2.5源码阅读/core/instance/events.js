/* @flow */

import {
  tip,
  toArray,
  hyphenate,
  handleError,
  formatComponentName
} from '../util/index'
import { updateListeners } from '../vdom/helpers/index'

export function initEvents (vm: Component) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false //是否有父组件绑定在当前组件上的事件
  // init parent attached events
  const listeners = vm.$options._parentListeners //父组件传入的自定义事件
  //_parentListeners在init里面initInternalComponent赋值
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}

let target: any

function add (event, fn) {
  target.$on(event, fn)
}

function remove (event, fn) {
  target.$off(event, fn)
}

function createOnceHandler (event, fn) {
  const _target = target
  return function onceHandler () {
    const res = fn.apply(null, arguments)
    if (res !== null) {
      _target.$off(event, onceHandler)
    }
  }
}

export function updateComponentListeners (
  vm: Component,
  listeners: Object,
  oldListeners: ?Object
) {
  target = vm
  updateListeners(listeners, oldListeners || {}, add, remove, createOnceHandler, vm)
  target = undefined
}

export function eventsMixin (Vue: Class<Component>) {
  const hookRE = /^hook:/
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    const vm: Component = this
    if (Array.isArray(event)) { //如果event是数组，则一个一个执行vm.$on()
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn)
      }
    } else {
      //vm._events[event]不存在则vm._events[event] = []，为什么用数组存事件，难道是为了可以给click事件绑定多个函数吗
      (vm._events[event] || (vm._events[event] = [])).push(fn)
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) { //是否存在钩子
        //如果是下列形式绑定的钩子，则_hasHookEvent属性为true,生命周期那种钩子另当别论
        //<child @hook:created="hookFromParent">
        vm._hasHookEvent = true
      }
    }
    return vm
  }

  Vue.prototype.$once = function (event: string, fn: Function): Component {
    const vm: Component = this
    function on () {
      vm.$off(event, on) //执行前先移除该事件
      fn.apply(vm, arguments)
    }
    on.fn = fn
    vm.$on(event, on)
    //vm.$once还是执行的vm.$on()，只是在vm.$on()传的回调中将移除该事件，并执行在$once传的回调函数
    return vm
  }

  Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {
    const vm: Component = this
    // all
    if (!arguments.length) { //如果没有传参数，则移除所有事件vm._events=null
      vm._events = Object.create(null)
      return vm
    }
    // array of events
    if (Array.isArray(event)) { //如果event是数组则一个一个执行$off
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$off(event[i], fn)
      }
      return vm
    }
    // specific event
    const cbs = vm._events[event] //这个事件可能对应有多个回调函数执行
    if (!cbs) { //一个函数都没有
      return vm
    }
    if (!fn) { //没有指定移除哪个回调函数，则直接移除该事件的所有回调函数
      vm._events[event] = null 
      return vm
    }
    // specific handler
    //指定了移除哪个回调函数，则只是将该事件的这个回调函数移除
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return vm
  }

  Vue.prototype.$emit = function (event: string): Component {
    const vm: Component = this
    if (process.env.NODE_ENV !== 'production') { //不为生产环境
      const lowerCaseEvent = event.toLowerCase() //事件名变为全小写
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          `Event "${lowerCaseEvent}" is emitted in component ` +
          `${formatComponentName(vm)} but the handler is registered for "${event}". ` +
          `Note that HTML attributes are case-insensitive and you cannot use ` +
          `v-on to listen to camelCase events when using in-DOM templates. ` +
          `You should probably use "${hyphenate(event)}" instead of "${event}".`
        )
      }
    }
    let cbs = vm._events[event] //找到该事件对应的所有回调函数
    if (cbs) { //如果回调函数不为空，反正全部执行
      cbs = cbs.length > 1 ? toArray(cbs) : cbs
      const args = toArray(arguments, 1)
      for (let i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args)
        } catch (e) {
          handleError(e, vm, `event handler for "${event}"`)
        }
      }
    }
    return vm
  }
}
