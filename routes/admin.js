const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/admin/add-product', adminController.getAddProduct);
router.post('/admin/add-product', adminController.postAddProduct);
router.get('/admin/products', adminController.getProducts);
router.get('/admin/edit-product', adminController.getEditProduct)

module.exports = router;