const express = require('express');
const controller = require('../controllers/CategoryController');
const router = express.Router();

router.get('/', controller.getAll);

module.exports = router;