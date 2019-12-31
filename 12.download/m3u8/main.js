const fs  = require("fs");
const down = require("./down");
var host = 'https://xxxx/';
var outputName = "output.mp4";
 
 
var source = fs.readFileSync("./test.m3u8","utf-8"); //读取 m3u8
var arr  = source.split("\n");
arr = arr.filter((item)=>{
    return item.match(/\.ts$/);
});
 
down({
    arr,
    host,
    name:outputName
})