const http = require('http');

const hostname = '127.0.0.1';
const port = 0; // 0 for random port


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${server.address().port}`);
});
