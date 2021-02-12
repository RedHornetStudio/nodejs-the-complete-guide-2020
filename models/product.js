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

  save(callback) {
    Product.fetchAll(productsData => {
      let products = productsData;
      if(this.id) {
        const existingProductIndex = products.findIndex(product => product.id === this.id);
        products[existingProductIndex] = this;
      } else {
        if(products.length === 0) {
          this.id = 0;
        } else {
          this.id = products[products.length - 1].id + 1;
        }
        products.push(this);
      }
      fs.writeFile(pathToData, JSON.stringify(products), err => {
        if(err) {
          console.log(err);
        } else {
          callback();
        }
      });
    })
  }

  static fetchAll(callback) {
    fs.readFile(pathToData, (err, fileContent) => {
      if(err) {
        callback([]);
      } else {
        callback(JSON.parse(fileContent));
      }
    });
  }

  static getById(productId, callback) {
    Product.fetchAll(products => {
      const product = products.find(p => p.id === productId);
      callback(product);
    });
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