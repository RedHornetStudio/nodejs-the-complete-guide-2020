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
      this.id = products.length;
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

  static getById(productId, callback) {
    Product.fetchAll(products => {
      const product = products.find(p => p.id === productId);
      callback(product);
    });
  }
}

module.exports = Product;