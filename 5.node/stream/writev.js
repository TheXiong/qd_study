const Stream = require('stream')

let wsv = new Stream.Writable({
    highWaterMark:3,
    writev(chunks,cb){
        let data = chunks.reduce((a,b)=>{
            return Buffer.concat([a.chunk,b.chunk])
        })
        console.log(data.toString());
    },
})

wsv.cork();
wsv.write('一些');
wsv.write('数据');
process.nextTick(() => wsv.uncork());