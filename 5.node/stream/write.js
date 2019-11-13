const Stream = require('stream')
let data = []

let ws = new Stream.Writable({
    highWaterMark: 3,
    write: function (chunk, encoding,cb) {
        console.log(chunk.toString());
        cb()
    }
})

function write() {
    for (let i = 0; i < 9; i++) {
        let flag = ws.write(i+'')
    }
}



write();
