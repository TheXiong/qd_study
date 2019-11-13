const Stream = require('stream')
let index = 4

let dx = new Stream.Duplex({
    read(){
        if (index>0) {
            this.push('a')
            --index;
        } else {
            this.push(null)
        }
    },
    write(chunk,encoding,cb){
        console.log(chunk.toString().toUpperCase());
        cb()
    }
})
//双工流可以输入和输出，但他的输入和输出无法建立联系---》transform流可以
process.stdin.pipe(dx).pipe(process.stdout)
