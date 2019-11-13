const fs = require('fs')

fs.open('./w.txt','w',(err,fd)=>{

    fs.write(fd,Buffer.from("爱丽丝的海底维吾尔文"),0,5,null,(err,writen,buffer)=>{
        if(err) console.error(err);
        console.log(writen,buffer);
        
    })
})