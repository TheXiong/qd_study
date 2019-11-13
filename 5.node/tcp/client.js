let net  = require('net')

let socket = net.connect(8080,'localhost',()=>{
    console.log('连接服务器成功');
})

socket.on('data',data=>{
    process.stdout.write(data)
    process.stdin.setEncoding('utf8')
    process.stdin.pipe(socket)
})