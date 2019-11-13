const fs = require('fs')
const path = require('path')

function mkdirp(dirPath,callback) {
    let absPath = path.join(__dirname,dirPath);
    let pathArr = absPath.split(path.sep);
    !function next(index){
        if (index>pathArr.length) {
            callback(null)
            return
        }
        let cpath = pathArr.slice(0,index).join(path.sep)
        fs.access(cpath,0o666,err=>{
            if(err) {
                fs.mkdir(cpath,err=>{
                    if(err) callback(err);
                    next(index+1)
                })
            }else{
                next(index+1)
            }
        })
    }(1)
}

mkdirp("./a/b/c/d",err=>{
    if(err) console.error(err);
    mkdirp("./a/c/c/d",err=>{
        if(err) console.error(err);
        mkdirp("./a/e/c",err=>{
            if(err) console.error(err);
        })
    })
})

