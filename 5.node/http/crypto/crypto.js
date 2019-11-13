const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

let md5 = crypto.createHash('md5')
md5.update('sadad')
let r1 = md5.digest('hex')

console.log(r1); //49299ca918b02a430d8e677cbaea192d


let hmac = crypto.createHmac("md5","ad")
hmac.update('sad')
let r2 = hmac.digest('hex')

console.log(r2);

let hmac1 = crypto.createHmac("md5","sfsfd")
fs.createReadStream(path.join(__dirname,'msg.txt')).pipe(hmac1).pipe(process.stdout)
