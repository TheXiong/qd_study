const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

//Etag/if-None-Match
http.createServer((req, res) => {
    let params = url.parse(req.url);
    let pathname = params.pathname;
    let filepath = path.join(__dirname, pathname);
    let stat;
    try {
        stat = fs.statSync(filepath)
    } catch (error) {
        res.statusCode = 404;
        res.end("NOT FOUND")
    }

    if (stat) {
        let data = fs.readFileSync(filepath) //如果是大文件会比较耗时
        let lastHash = crypto.createHash('md5').update(data).digest('hex')
        let ifNoneMatch = req.headers['if-none-match']
        if (lastHash == ifNoneMatch) {
            res.statusCode = 304;
            res.end()
        } else {
            res.setHeader('Content-Type', 'text/plain')
            res.setHeader('Cache-Control', 'max-age=3600')
            // res.setHeader('Expires',new Date(Date.now()+3600).toUTCString())
            res.setHeader('ETag', lastHash)
            fs.createReadStream(filepath).pipe(res)
        }
    }
}).listen(8080)