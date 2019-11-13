const url = require('url')
function query(options){
    return function(req,res,next){
        let urlObj = url.parse(req.url)
        for (const key in urlObj) {
            req[key] = urlObj[key]
        }
        next()
    }
}
module.exports = query