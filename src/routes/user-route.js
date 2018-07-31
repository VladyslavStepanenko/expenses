const express = require('express');
const controller = require('../controllers/user-controller');
const authHelper = require('../auth/auth-helper');
const router = express.Router();

router.post('/register', controller.register);
router.get('/:id/profile', authHelper.authorize, controller.getProfile);
router.post('/auth', controller.authenticate)

module.exports = router;