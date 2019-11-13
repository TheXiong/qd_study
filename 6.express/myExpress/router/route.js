const http = require('http')
const Layer = require('./layer')
function Route(path) {
    this.path = path;
    this.stack = [];
    this.methods = {};
}

Route.prototype.dispatch = function (req, res, done) {
    let method = req.method.toLowerCase()
    let idx = 0;
    let self = this;
    
    function next() {
        if (idx >= self.stack.length) {
            return done()
        }
        let layer = self.stack[idx++];
        if (layer.method == method) {
            layer.handle_request(req, res, next)
        } else {
            next()
        }
    }
    next()
}

http.METHODS.forEach(method => {
    Route.prototype[method.toLowerCase()] = function () {
        let handles = Array.from(arguments)
        handles.forEach(handle => {
            let layer = new Layer('/', {}, handle)
            layer.method = method.toLowerCase();
            this.methods[method.toLowerCase()] = true;
            this.stack.push(layer)
        })
    }
})



module.exports = Route