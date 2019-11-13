const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
const zlib = require('zlib');

http.createServer((req,res)=>{
    let filePath = path.join(__dirname,url.parse(req.url).pathname);
    let fileExist = false
    let isDirectory = false
    try {
        let stat = fs.statSync(filePath);
        isDirectory = stat.isDirectory();
        fileExist = true;
    } catch (error) {
        res.statusCode = 404
        res.end("not found")
    }
    
    if (fileExist) {
        let acceptEncoding = req.headers['accept-encoding']
        let acceptArr = acceptEncoding.split(',').map(opt=>{
            return opt.trim()
        })
        if (acceptArr.includes('gzip')) {
            res.setHeader('Content-Encoding','gzip')
            fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(fs.createWriteStream(filePath+'.gzip'))
            fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res)
        }else if(acceptArr.includes('deflate')){
            res.setHeader('Content-Encoding','deflate')
            fs.createReadStream(filePath).pipe(zlib.createDeflate()).pipe(res)
        }else{
            fs.createReadStream(filePath).pipe(res)
        }
    }
}).listen(8080)
