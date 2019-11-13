const less = require('less')

module.exports = function(source){
    let callback = this.async()
    less.render(source,{}).then(output=>{
        console.log(output.css);
        
        callback(null,`${JSON.stringify(output.css)}`)
    })
    return undefined
}