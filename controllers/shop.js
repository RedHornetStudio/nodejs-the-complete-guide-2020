const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  Product.getById(parseInt(req.params.productId), product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Product Details',
      path: '/products'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getProducts(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      cart.products.forEach(cartProduct => {
        const product = products.find(product => product.id === cartProduct.id);
        product.qty = cartProduct.qty;
        cartProducts.push(product);
      })
      let totalPrice = 0;
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
  })
};

exports.postCart = (req, res, next) => {
  Product.getById(parseInt(req.body.productId), product => {
    Cart.addProduct(product.id, product.price, () => {
      res.redirect('/cart');
    });
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