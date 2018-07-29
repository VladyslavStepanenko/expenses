const http = require('http');
const express = require('express')

const hostname = "0.0.0.0";
const port = normalizePort(process.env.PORT || '3000');

const app = express();
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        status:"ok",
        message:"Hello"
    });
});

app.use('/', route);

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