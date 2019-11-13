const fs = require('fs')
const path = require('path')

//异步递归删除
function rmdirp(dirpath) {
    let absPath = path.isAbsolute(dirpath) ? dirpath : path.resolve(dirpath)
    return new Promise((resolve, reject) => {
        fs.readdir(absPath, (err, files) => {
            if (err) return reject(err);
            if (files.length == 0) {
                fs.rmdir(absPath, (err) => {
                    if (err) return reject(err);
                    resolve()
                })
            } else {
                Promise.all(
                    files.map(file => {
                        return new Promise((resolve, reject) => {
                            let cpath = absPath + path.sep + file;
                            fs.stat(cpath, (err, stat) => {
                                if (err) reject(err);
                                if (stat.isDirectory()) {
                                    rmdirp(cpath).then(resolve,reject)
                                } else {
                                    fs.unlink(cpath, (err) => {
                                        if (err) reject(err);
                                        resolve()
                                    })
                                }
                            })
                        })
                    })
                ).then(res => {
                    fs.rmdir(absPath, (err) => {
                        if (err) return reject(err);
                        resolve()
                    })
                }, reject)
            }
        })
    })
}

rmdirp('./a')