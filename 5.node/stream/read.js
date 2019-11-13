const stream = require('stream');
let str = '123456789'
let pos = 0;

let rs = new stream.Readable({
    highWaterMark: 3,
    read: function (n) {
        if (pos <= str.length) {
            let data = str.substr(pos, str.length - pos >= n ? n : str.length - pos)
            this.push(data)
            pos += n
        } else {
            this.push(null)
        }
    }
})
// rs.on('data', (data) => {
//     console.log(data.toString());
// })
rs.on('readable',function(){
    // console.log('readable');
    let chunk = rs.read(1)
    if (chunk) {
        console.log(chunk.toString());
    }
    
    //使用 readable.read() 处理数据时， while 循环是必需的。 只有在 readable.read() 返回 null 之后，才会触发 'readable'。
    // while (null !== (chunk = rs.read(1))) {
    //     console.log(chunk.toString());
    // }
})

rs.on('end', () => {
    console.log('end');

})
rs.on('error', err => {
    console.log(err);

})