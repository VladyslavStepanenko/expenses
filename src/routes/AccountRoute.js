const express = require('express');
const controller = require('../controllers/AccountController');
const authHelper = require('../auth/auth-helper');
const router = express.Router();

router.get('/', authHelper.authorize, controller.getProfile);
router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router;