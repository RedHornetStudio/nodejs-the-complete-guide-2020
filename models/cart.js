const fs = require('fs');
const path = require('path');

const pathToData = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

class Cart {
  static addProduct(productId, callback) {
    fs.readFile(pathToData, (err, fileContent) => {
      let cart = [];
      if(!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProduct = cart.find(product => product.id === productId);
      if(existingProduct) {
        existingProduct.qty++;
      } else {
        cart.push({ id: productId, qty: 1 });
      }
      fs.writeFile(pathToData, JSON.stringify(cart), err => {
        if(err) {
          console.log(err);
        } else {
          callback();
        }
      });
    });
  }

  static getProducts(callback) {
    fs.readFile(pathToData, (err, fileContent) => {
      if(err) {
        callback(null)
      } else {
        const cart = JSON.parse(fileContent);
        callback(cart);
      }
    });
  }

  static delete(id, callback) {
    fs.readFile(pathToData, (err, fileContent) => {
      if(err) {
        console.log(err);
        return;
      }
      let cart = JSON.parse(fileContent);
      cart = cart.filter(p => p.id !== id);
      fs.writeFile(pathToData, JSON.stringify(cart), err => {
        if(err) {
          console.log(err);
        } else {
          callback();
        }
      });
    });
  }
}

module.exports = Cart;