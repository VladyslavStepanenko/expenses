const http = require('http');
const app = require('../src/app');

const hostname = "0.0.0.0";
const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server = http.createServer(app);

server.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}`);

function normalizePort(val) {
    const port = parseInt(val, 10);
    
    if(isNaN(port)) {
        return val;
    }

    if(port >= 0) {
        return val;
    }

    return false;
}