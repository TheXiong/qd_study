const Stream = require('stream')

let sm = new Stream.Transform({
    transform(chunk,encoding,cb){
        this.push(chunk.toString().toUpperCase())
        cb()
    }
})

process.stdin.pipe(sm).pipe(process.stdout)