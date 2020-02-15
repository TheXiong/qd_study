const resloveImports = require('css-imports');
const path = require('path')

module.exports = function (source) {
    // let callback = this.async()
    //处理@import
    source = resloveImports(source, element => {
        elementPath = path.join(path.dirname(this.resourcePath), element.path);
        this.addDependency(elementPath)
        return '' //替换成空字符串
    })    

    //处理url()
    return source
}