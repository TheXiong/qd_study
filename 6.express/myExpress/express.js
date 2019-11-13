const EventEmitter = require('events').EventEmitter;
const proto = require('./application')
const Router = require('./router')

function createApplication() {
    let app = function(req,res,callback){
        app.handle(req,res,callback)
    }

    Object.setPrototypeOf(app, EventEmitter.prototype)
    Object.setPrototypeOf(app, proto)
    
    return app
}

createApplication.Router = Router

module.exports = createApplication