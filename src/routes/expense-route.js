'use strict'; // what is it?

const express = require('express');
const router = express.Router();

const find = router.get('/', (req, res, next) => {
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

module.exports = router;