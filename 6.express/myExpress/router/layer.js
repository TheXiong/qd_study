

function Layer(path, options, callback) {
    this.path = path;
    this.options = options;
    this.handle = callback;
}
Layer.prototype.match = function (path) {
    if (this.path == path) {
        return true
    }
    if (!this.route) { //中间件
        return this.path == '/' || (path.startsWith(this.path) && path.startsWith(this.path + '/'))
    }
    return false
}

Layer.prototype.handle_request = function (req, res, next) {
    let fn = this.handle;
    try {
        fn(req, res, next)
    } catch (error) {
        next(error)
    }
}

module.exports = Layer