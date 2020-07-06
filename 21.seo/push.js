const http = require('http')
const fs = require('fs')
const xml2js = require('xml2js')

//百度主动推送
function submitUrlToBaidu(option) {
  var urlArray = option.urlArray; //url数组
  var interfacePath = option.interfacePath; //接口调用地址
  var callback = option.success; //调用完成后的回调函数
  var urlList = "";
  if (urlArray.length > 1 || Array.isArray(urlArray)) {
    urlList = urlArray.join("\n");
  } else {
    urlList = urlArray;
  }
  var options = {
    host: "data.zz.baidu.com",
    path: interfacePath, //接口的调用地址
    method: "post",
    "User-Agent": "curl/7.12.1",
    headers: {
      "Content-Type": "text/plain",
    },
  };
  var httpReq = http.request(options, function (resp) {
    resp.setEncoding("utf8");
    resp.on("data", function (data) {
      callback(data);
      console.log("data:", data); //返回的数据
    });
  });

  httpReq.write(urlList);
  httpReq.end();
}


var urls = []
const parser = new xml2js.Parser()
fs.readFile('./sitemap_en.xml', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
    } else {
        parser.parseString(data, (err, result) => {//xml转为json
            urls = result.urlset.url.map(obj => obj.loc)//读取所有url存到数组
            submitUrlToBaidu({
                urlArray: urls,
                interfacePath: "http://data.zz.baidu.com/urls?site=https://www.mindspore.cn&token=GwEOfLv1s3agXQot",
                success: (data)=>{
                    console.log(data,"success");
                }
            })
        })
    }

})
