const fs = require('fs')
const path = require('path')

//异步先序深度优先遍历目录
function deep(dirPath){
    let absPath = path.resolve(dirPath)
    // fs.stat(absPath,(err,stat)=>{
    //     if(err) console.error(err);
    //     if (stat.isDirectory()) {
    //         fs.readdir(absPath,(err,files)=>{
    //             if(err) console.error(err);
    //             console.log(files);
    //             !function next(index){
    //                 files[index]
    //             }(0)
    //         })
    //     }else{
    //         console.log(absPath);
    //     }
    // })
}

deep('./a');