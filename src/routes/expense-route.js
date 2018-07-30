'use strict'; // what is it?

const express = require('express');
const controller = require('../controllers/expense-controller');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.edit);
router.delete('/:id', controller.delete);

module.exports = router;