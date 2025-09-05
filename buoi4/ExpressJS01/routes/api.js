const express = require('express');
const { getUsers, createUser, handleLogin, getAccount } = require('../controllers/userController');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const delayMiddleware = require('../middleware/delay');

router.post('/login', handleLogin);
router.post('/register', createUser);
router.get('/users', getUsers);
router.get('/account', delayMiddleware, getAccount);

module.exports = router;