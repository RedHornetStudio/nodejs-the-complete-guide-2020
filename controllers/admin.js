const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    product: null,
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title, req.body.imageUrl, parseInt(req.body.price), req.body.description);
  product.save(() => {
  res.redirect('/');
  });
};

exports.getEditProduct = (req, res, next) => {
  Product.getById(parseInt(req.params.productId), product => {
    res.render('admin/edit-product', {
      product: product,
      pageTitle: 'Edit Product',
      path: '/admin/products'
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const product = new Product(req.body.title, req.body.imageUrl, parseInt(req.body.price), req.body.description, parseInt(req.body.productId));
  product.save(() => {
    res.redirect('/admin/products');
  });
};

exports.postDeleteProduct = (req, res, next) => {
  Product.delete(parseInt(req.body.productId), () => {
    res.redirect('/admin/products');
  });
};