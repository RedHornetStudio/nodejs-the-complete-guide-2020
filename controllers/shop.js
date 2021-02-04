const Product = require('../models/product');

const getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

const getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All products',
      path: '/products'
    });
  });
};

const getProductDetails = (req, res, next) => {
  Product.getProductById(req.params.productId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Product Details',
      path: '/products',
      productId: req.params.productId
    });
  });
};

const getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Cart',
    path: '/cart'
  });
};

const postCart = (req, res, next) => {
  console.log(req.body.productId);
  res.redirect('/cart');
};

const getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
};

const getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders'
  })
};

module.exports = {
  getIndex,
  getProducts,
  getProductDetails,
  getCart,
  postCart,
  getCheckout,
  getOrders
}