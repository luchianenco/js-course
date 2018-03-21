const http = require('http');
const emitter = require('./log');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    emitter.emit('request', {url: req.url});

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
