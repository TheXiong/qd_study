module.exports = class AsyncPlugin {
    constructor() { }
    apply(compiler) {
        compiler.hooks.emit.tapAsync('emit', function (compilation, callback) {
            setTimeout(() => {
                console.log('emit1');
                callback()
            }, 2000)
        })
        compiler.hooks.emit.tapPromise('emit', (compilation) => (new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('emit2');
                resolve()
            }, 2000)
        })))
    }
}