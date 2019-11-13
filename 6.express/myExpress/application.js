const http = require('http')
const Router = require('./router')
const query = require('./middleware/query')

let proto = {}

proto.handle = function(req,res,callback){
    this.lazyRouter();
    this._router.handle(req,res,callback);
}

proto.lazyRouter = function(){
    if (!this._router) {
        this._router = new Router()
        this._router.use(query({}))
    }
}

proto.use = function(){
    if (!this._router) {
        this._router = new Router()
        this._router.use(query({}))
    }
    
    this._router.use(...arguments)
}

http.METHODS.forEach(method=> {
    proto[method.toLowerCase()] = function(path){
        this.lazyRouter();
        let route = this._router.route(path)
        route[method.toLowerCase()].apply(route,Array.prototype.slice.call(arguments,1))
    }
})

proto.listen = function(){
    let server = http.createServer(this)
    return server.listen(...arguments)
}

module.exports = proto