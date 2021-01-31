const express = require('express');

const { getAddProduct, postAddProduct } = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET (/admin route is pointed in app.js file)
router.get('/add-product', getAddProduct);

// /admin/add-product => POST (/admin route is pointed in app.js file)
router.post('/add-product', postAddProduct);

module.exports = router;