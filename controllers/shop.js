const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
      res.render('shop/index', {
        prods: [],
        pageTitle: 'Shop',
        path: '/'
      });
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
      res.render('shop/product-list', {
        prods: [],
        pageTitle: 'All products',
        path: '/products'
      });
    });
};

exports.getProduct = (req, res, next) => {
  Product.getById(parseInt(req.params.productId))
    .then(([rows, fieldData]) => {
      res.render('shop/product-detail', {
        product: rows[0],
        pageTitle: 'Product Details',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
      res.render('shop/product-detail', {
        product: null,
        pageTitle: 'Product Details',
        path: '/products'
      });
    });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    const cartProducts = [];
    let totalPrice = 0;
    if(cart) {
      Product.fetchAll(products => {
        cart.forEach(cartProduct => {
          const product = products.find(product => product.id === cartProduct.id);
          product.qty = cartProduct.qty;
          cartProducts.push(product);
        })
        cartProducts.forEach(product => {
          totalPrice += product.price * product.qty;
        });
        res.render('shop/cart', {
          pageTitle: 'Cart',
          path: '/cart',
          products: cartProducts,
          totalPrice: totalPrice
        });
      })
    } else {
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: cartProducts,
        totalPrice: totalPrice
      });
    }
  })
};

exports.postCart = (req, res, next) => {
  Cart.addProduct(parseInt(req.body.productId), () => {
    res.redirect('/cart');
  });
};

exports.postDeleteProductFromCart = (req, res, next) => {
  Cart.delete(parseInt(req.body.productId), () => {
    res.redirect('/cart');
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders'
  })
};