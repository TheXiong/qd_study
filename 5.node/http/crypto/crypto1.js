const http = require('http')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')


http.createServer((req, res) => {
    let key = fs.readFileSync(path.join(__dirname,'msg.txt'))
    let md5 = crypto.createHash('md5');
    md5.update(key)
    let r = md5.digest('hex')
    res.setHeader('Content-MD5',r)
    res.end()
}).listen(8080)
