const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('admin/products', {
        prods: rows,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err);
      res.render('admin/products', {
        prods: [],
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
  const product = new Product(req.body.title, req.body.imageUrl, parseFloat(req.body.price), req.body.description);
  product.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  Product.getById(parseInt(req.params.productId))
    .then(([rows, fieldData]) => {
      res.render('admin/edit-product', {
        product: rows[0],
        pageTitle: 'Edit Product',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const product = new Product(req.body.title, req.body.imageUrl, parseFloat(req.body.price), req.body.description, parseInt(req.body.productId));
  product.save(() => {
    res.redirect('/admin/products');
  });
};

exports.postDeleteProduct = (req, res, next) => {
  Product.delete(parseInt(req.body.productId), () => {
    res.redirect('/admin/products');
  });
};