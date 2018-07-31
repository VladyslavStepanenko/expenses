const express = require('express');
const controller = require('../controllers/user-controller');
const router = express.Router();

router.post('/register', controller.register);
router.get('/:id/profile', controller.getProfile);
router.post('/auth', controller.authenticate)

module.exports = router;