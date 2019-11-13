const Layer = require('./layer')
const Route = require('./route')
const url = require('url')
const http = require('http')

let proto = function(options){
    let router = function(req,res,next){
        router.handle(...arguments)
    }
    router.stack = [] //stack里面存放多个layer
    Object.setPrototypeOf(router,proto)
    return router
}

proto.use = function (path) {
    let args = Array.from(arguments);
    let fns = args.slice(1);
    if (typeof path == "function") {
        path = '/'
        fns = args;
    }
    
    fns.forEach(fn => {
        let layer = new Layer(path, {}, fn)
        layer.route = undefined; //通过route可以区分是中间件还是路由
        layer.isMiddle = true;
        this.stack.push(layer)
    })
}

proto.route = function (path) {
    let route = new Route(path)
    let layer = new Layer(path, {}, route.dispatch.bind(route))
    layer.route = route
    this.stack.push(layer)
    return route
}

http.METHODS.forEach(function (method) {
    proto[method.toLowerCase()] = function (path) {
        var route = this.route(path)
        route[method.toLowerCase()].apply(route, Array.prototype.slice.call(arguments, 1));
        return this;
    };
});

proto.handle = function (req, res, done) {
    let { pathname } = url.parse(req.url,true)
    let idx = 0;
    let self = this;
    let removed = '';

    function next() {
        if (removed.length>0) {
            req.url = removed + req.url
            req.url = req.url == '//'?'/':req.url
            removed = ''
        }
        if (idx >= self.stack.length) {
            done&&done()
            return
        }
        
        let layer = self.stack[idx++];
        if (layer.match(pathname)) {
            if (!layer.route) { //这一层是中间件
                removed = layer.path;
                req.url = req.url.slice(removed.length)
                req.url = req.url == ''?'/':req.url
                layer.handle_request(req, res, next)
            }else{
                layer.handle_request(req, res, next)
            }
        } else {
            next()
        }
    }
    next()
}

module.exports = proto