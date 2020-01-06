const net = require('net')
const crypto = require('crypto')

net.createServer(socket => {
    socket.on('connect', () => {
        console.log('connect');
    })

    socket.once('data', buf => {
        let headerString = buf.toString();
        let headerArr = headerString.split('\r\n').slice(1, -2)
        let headers = {}
        for (let i = 0; i < headerArr.length; i++) {
            let [key, value] = headerArr[i].split(": ")
            headers[key.toLowerCase()] = value
        }
        if (headers['connection'] == 'Upgrade' && headers['upgrade'] == 'websocket' && headers['sec-websocket-version'] == '13') {
            //websocket 13握手
            let websocket_13_key = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
            let Sec_WebSocket_Key = headers['sec-websocket-key']
            let key = Sec_WebSocket_Key + websocket_13_key
            let sha = crypto.createHash('sha1')
            sha.update(key)
            let Sec_WebSocket_Accept = sha.digest('base64')
            socket.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${Sec_WebSocket_Accept}\r\n\r\n`)
        }
        socket.on('data', data => {
            console.log(decodeDataFrame(data)); //解析websocket数据帧
            let frame = decodeDataFrame(data)
            let resdata = {
                FIN:1,
                Opcode:1,
                PayloadData:`接收到: ${frame.PayloadData}`
            }
            socket.write(encodeDataFrame(resdata))
        })
    })

    socket.on('close', err => {
        console.log(err);

    })
    socket.on('end', () => {
        console.log('end');
    })

}).listen(5555)


function decodeDataFrame(e) {
    var i = 0, j, s, frame = {
        FIN: e[i] >> 7, Opcode: e[i++] & 0xF, Mask: e[i] >> 7,
        PayloadLength: e[i++] & 0x7F
    };
    //处理特殊长度126和127
    if (frame.PayloadLength == 126) {
        frame.PayloadLength = (e[i++] << 8) + e[i++];
    }
    if (frame.PayloadLength == 127) {
        i += 4;
        frame.PayloadLength = (e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++];
    }
    //判断是否使用掩码
    if (frame.Mask) {
        frame.MaskingKey = [e[i++], e[i++], e[i++], e[i++]];
        for (j = 0, s = []; j < frame.PayloadLength; j++) {
            s.push(e[i + j] ^ frame.MaskingKey[j % 4]);
        }
    } else {
        s = e.slice(i, frame.PayloadLength);
    }
    
    s = Buffer.from(s);
    if (frame.Opcode == 1) {
        s = s.toString();
    }
    frame.PayloadData = s;
    return frame;
}

function encodeDataFrame(e) {
    var s = [], o = Buffer.from(e.PayloadData), l = o.length;
    s.push((e.FIN << 7) + e.Opcode);
    if (l < 126) {
        s.push(l);
    }
    else if (l < 0x10000) {
        s.push(126, (l & 0xFF00) >> 2, l & 0xFF);
    } else {
        s.push(
            127, 0, 0, 0,
            (l & 0xFF000000) >> 6, (1 & 0xFF0000) >> 4, (1 & 0xFF00) >> 2, l & 0xFF
        );
    }
    return Buffer.concat([Buffer.from(s), o]);
}
