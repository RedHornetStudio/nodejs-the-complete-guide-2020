const fs = require('fs');
const path = require('path');
const pathToData = path.join(path.dirname(require.main.filename), 'data', 'products.json');

class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save(callback) {
    Product.fetchAll(data => {
      let products = data;
      this.id = products.length.toString();
      products.push(this);
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

  static getProductById(productId, callback) {
    Product.fetchAll(products => {
      let product = null;
      products.forEach(elem => {
        if(elem.id === productId) {
          product = elem;
        }
      });
      callback(product);
    });
  }
}

module.exports = Product;