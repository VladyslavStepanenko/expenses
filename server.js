const http = require('http');
const express = require('express')

const hostname = "0.0.0.0";
const port = "3000";

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