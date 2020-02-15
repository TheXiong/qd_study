const less = require('less')
const loaderUtils = require('loader-utils');

module.exports = function (source) {
    let callback = this.async()
    let options = loaderUtils.getOptions(this)
    less.render(source, {
        plugins: [],
        relativeUrls: true,
        filename: this.resourcePath,
        ...options
    }).then(output => {
        let { css, imports } = output;
        imports.forEach((importsItem) => { //处理@import
            this.addDependency(importsItem)
        })
        callback(null,`${JSON.stringify(css)}`)
    }).catch(err => {
        console.log(err);
        callback(err)
    })
    return undefined
}