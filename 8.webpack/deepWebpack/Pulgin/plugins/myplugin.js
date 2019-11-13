module.exports = class MyPlugin {
    constructor(options){
        console.log(options);
    }
    apply(compiler){
        compiler.hooks.compilation.tap('compilation',function(compilation,params){
            compilation.hooks.optimize.tap('optimize',function(...args){
                console.log("optimize");
            })
        })
    }
}