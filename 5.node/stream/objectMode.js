const Stream = require('stream')
let str = `{
	"name": "aaaa",
	"age": 10
}`
let readed = false;

let rs = new Stream.Readable({
    highWaterMark: 3,
    read() {
        if (!readed) {
            this.push(str)
        } else {
            this.push(null)
        }
    }
})

let toJson = new Stream.Transform({
    highWaterMark: 3,
    readableObjectMode:true,
    transform(chunk, encoding, cb) {
        this.push(JSON.parse(chunk.toString()))
    }
})

let outJson = new Stream.Transform({
    highWaterMark:3,
    writableObjectMode:true,
    transform(chunk,encoding,cb){
        console.log(typeof chunk); //object
        cb()
    }
})

rs.pipe(toJson).pipe(outJson)
