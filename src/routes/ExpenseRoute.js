const express = require('express');
const controller = require('../controllers/ExpenseController');
const auth = require('../auth/auth-helper');
const router = express.Router();

router.get('/', auth.authorize, controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.edit);
router.delete('/:id', controller.delete);

module.exports = router;