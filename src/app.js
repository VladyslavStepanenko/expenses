'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        status:"ok",
        message:"Hello"
    });
});

const create = router.post('/', (req, res, next) => {
    res.status(201).send({
        status:"saved"
    });
});

const edit = router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        status:"edited"
    });
});

const remove = router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        status:"deleted"
    });
});

app.use('/', route);
app.use('/expenses', create);
app.use('/expenses', edit);
app.use('/expenses', remove);

module.exports = app;