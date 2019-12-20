const http = require('http')
const fs = require('fs')
const path = require('path')


const postData = JSON.stringify({
    item: 14,
    type: 51
});
let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'X-Token': 'hqeBbBpBYgGQbbTZqzQOPRZqHWg4zPavwHkvtBP4B8Z+TxE4/G+/NmxdwpIkJ3R2s0g+jBQKwyvAIcLmc0Yc8TZNS1LcZKj4j3Ule4yftKfl+yymjvzkTPmHm4edQxQj1uto+gsA4unHT2qObLl4T1UUNjwsz/HHwLYdmMUDtRHhCfBOrHILseK6MJdsZ4j5oWs1VHPtHY4pZzC1wk1ja/sfPSCQg7su0SoqPKgMN/fNbu0CWbXOFjmOSpA1IztbuvLwgIgr63x5Spfl12+3QodO+HMr3gqrmdJTO9gZSMOt5luM+YougIbpKh4HnOPbaaycfGbftErr1q6WM9wQpg=='
    }
}
function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str).slice(1, -1);
}
const req = http.request('http://localhost:8080/api/item/item/house_download', options, res => {
    let filePath = path.resolve('./', decodeUnicode(res.headers.filename))
    console.log(res.headers);
    
    res.on('data', (chunk) => {
        console.log(chunk);
        
        fs.writeFile(filePath, chunk, { flag: 'a' }, err => {
            if (err) return
        });
    });
    res.on('end', () => {
        console.log('响应中已无数据');
    });
})

// 将数据写入请求主体。
req.write(postData);
req.end();