const http = require('http')
const url = require('url')

class Client {
    constructor(res) {
        this.response = res;
        this.id = 0
    }
    send(event, data) {
        this.response.write(`id: ${++this.id}\r\nevent: ${event}\r\ndata: ${JSON.stringify(data)}\r\n\r\n`)
    }
    init() {
        this.response.setHeader('Access-Control-Allow-Origin', '*')
        this.response.setHeader('Access-Control-Allow-Headers', '*')
        this.response.setHeader('Content-Type', 'text/event-stream')
        this.response.setHeader('Cache-Control', 'no-cache')
        this.response.setHeader('Connection', 'keep-alive')
        this.send('ping', { time: Date.now() });
        setInterval(() => {
            this.send('ping', { time: Date.now() });
        }, 3000);
    }
}

let clients = []

http.createServer((req, res) => {
    let { pathname } = url.parse(req.url, true)
    if (pathname == '/es') {
        let client = new Client(res)
        client.init();
        clients.push(client)
    }
}).listen(5000)