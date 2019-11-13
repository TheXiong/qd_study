const fs = require('fs')

let rs = fs.createReadStream('./a.txt',{
    // encoding:'utf8',
    highWaterMark:3
});
rs.on('data',data=>{
    console.log(data);
    
})

rs.on('end',()=>{
    console.log('end');
    
})