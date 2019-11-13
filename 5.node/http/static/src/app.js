const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const crypto = require('crypto')
const mime = require('mime')
const ejs = require('ejs')

function createServer(options) {
    http.createServer((req, res) => {
        let publicPath = options.publicPath
        let { pathname } = url.parse(req.url)
        let filePath = path.join(publicPath, pathname)
        let stat;
        try {
            stat = fs.statSync(filePath)
        } catch (error) {
            res.statusCode = 404
            res.end('Not Found!')
        }

        if (stat) { //文件存在
            if (stat.isDirectory()) { //文件是目录
                let lists = fs.readdirSync(filePath).map(list => {
                    return path.join(pathname, list)
                })
                template = fs.readFileSync(path.join(__dirname, '../template/dir.ejs'))
                html = ejs.render(template.toString(), { title: filePath, lists })
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end(html)
            } else {
                //缓存
                let ifModifiedSince = req.headers['if-modified-since']
                let ifNoMatch = req.headers['if-none-match']
                let lastModified = stat.ctime.toUTCString()
                let lastETag = crypto.createHash('md5').update(stat.ctime.toUTCString()).digest('hex')
                if ((ifModifiedSince && ifModifiedSince == lastModified) || (ifNoMatch && ifNoMatch == lastETag)) { //缓存命中
                    res.statusCode = 304
                    res.end()
                } else {
                    res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')
                    res.setHeader('Cache-Control', 'pubilc,max-age=3600')
                    res.setHeader('Last-Modified', lastModified)
                    res.setHeader('ETag', lastETag)
                    //压缩传输
                    let acceptEncoding = req.headers['accept-encoding']
                    if (/\bgzip\b/.test(acceptEncoding)) {
                        res.setHeader('Content-Encoding', 'gzip')
                        let gzStat;
                        try {
                            gzStat = fs.statSync(filePath + '.gz')
                        } catch (error) {}
                        if (gzStat) {
                            fs.createReadStream(filePath + '.gz').pipe(res)
                        } else {
                            if (stat.size>10*1024) {
                                fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res)
                            }else{
                                res.removeHeader('Content-Encoding');
                                fs.createReadStream(filePath).pipe(res)
                            }
                        }
                    } else if (/\bdeflate\b/.test(acceptEncoding)) {
                        res.setHeader('Content-Encoding', 'deflate')
                        fs.createReadStream(filePath).pipe(zlib.createDeflate()).pipe(res)
                    } else {
                        fs.createReadStream(filePath).pipe(res)
                    }
                }
            }
        }

    }).listen(options.port, () => {
        console.log(`server start at ${options.host}:${options.port}`);
    })
}

module.exports = createServer