const express = require('express');
const { getUsers, createUser, handleLogin, getAccount } = require('../controllers/userController');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const delayMiddleware = require('../middleware/delay');
const { getProducts, searchProduct } = require('../controllers/productController');

router.post('/login', handleLogin);
router.post('/register', createUser);
router.get('/users', getUsers);
router.get('/account', delayMiddleware, getAccount);

//product api

// router.get('/products/:id', getProductById);
router.get('/products', getProducts)
router.get('/products/search', searchProduct);
module.exports = router;