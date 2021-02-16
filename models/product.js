const db = require('../util/database');

const fs = require('fs');
const path = require('path');
const Cart = require('../models/cart');

const pathToData = path.join(path.dirname(require.main.filename), 'data', 'products.json');

class Product {
  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this.id = id;
  }

  save() {
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static getById(productId) {
    return db.execute('SELECT * FROM products WHERE id = ?', [productId]);
  }

  static delete(productId, callback) {
    Product.fetchAll(productsData => {
      let products = productsData;
      const existingProductIndex = products.findIndex(product => product.id === productId);
      products.splice(existingProductIndex, 1);
      Cart.delete(productId, () => {
        fs.writeFile(pathToData, JSON.stringify(products), err => {
          if(err) {
            console.log(err);
          } else {
            callback();
          }
        });
      });
    })
  }
}

module.exports = Product;