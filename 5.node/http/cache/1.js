const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')


//Last-Modified/if-Modified-Since
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
        let lastModified = stat.ctime.toUTCString()
        let ifModifiedSince = req.headers['if-modified-since']
        if (lastModified==ifModifiedSince) {
            res.statusCode = 304;
            res.end()
        } else {
            let data = fs.readFileSync(filepath)
            res.setHeader('Cache-Control', 'max-age=3600')
            res.setHeader('Last-Modified', lastModified)
            res.end(data.toString())
        }
    }

}).listen(8080)