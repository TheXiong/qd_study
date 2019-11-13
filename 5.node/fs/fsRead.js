const fs = require('fs')
const {StringDecoder} = require('string_decoder')

const decoder = new StringDecoder('utf8')

//异步一点点读取文件内容
function readFile(path,bufferLength,callback){
    let result = '';
    fs.access(path,err=>{
        if(err) callback(err);
        fs.open(path,'r',(err,fd)=>{
            if(err) callback(err);
            let buf1 = Buffer.alloc(bufferLength);
            !function next(){
                fs.read(fd,buf1,0,bufferLength,null,(err,bytesRead,buffer)=>{
                    if(err) callback(err);
                    if (bytesRead == 0) {
                        callback(null,result)
                    }else{
                        let r = decoder.write(buffer)
                        result += r;
                        next();
                    }
                })
            }()
        })
    })
}
console.time('s');
readFile('./a.txt',5,(err,res)=>{
    if (err) console.error(err);
    console.log(res);
    console.timeEnd('s');
})
