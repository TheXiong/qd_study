const net = require('net')
let sockets = [];

let server = net.createServer(socket => {
    socket.write('连接服务器成功，请输入用户名:\r\n')

    socket.setEncoding('utf8')
    let username;
    socket.on('data', data => {
        data = data.replace('\r\n', '')
        if (username) {
            broadcast(username, data + '\r\n');
        } else {
            username = data;
            if (sockets[username]) {
                socket.write('该用户名已存在，请更换其他用户名:\r\n')
            } else {
                sockets[username] = socket;
                broadcast('sys', `欢迎${username}加入房间\r\n`);
            }
        }
    })
    socket.on('error', err => {
        console.log(err);
    })

    socket.on('close', had_error => {
        broadcast('sys', `${username}退出房间\r\n`).then(() => {
            sockets[username].destroy();
            delete sockets[username];
        })
    })
})

function broadcast(username, msg) {
    return new Promise((resolve, reject) => {
        if (username=='sys') {
            sockets.forEach(socket=>{
                socket.write(`${msg}`)
            })
        }else{
            for (const name in sockets) {
                if (name != username) {
                    sockets[name].write(`${username}:${msg}`)
                }
            }
        }
        
        resolve()
    })

}

server.on('error', err => {
    console.log('服务器发生错误' + err);
})

server.listen(8080)