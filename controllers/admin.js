const Product = require('../models/product');

const getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
};

const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description);
  product.save(() => {
  res.redirect('/');
  });
};

const getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

const getEditProduct = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/edit-product', {
      prods: products,
      pageTitle: 'Admin Edit Products',
      path: '/admin/edit-product'
    });
  });
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct
}