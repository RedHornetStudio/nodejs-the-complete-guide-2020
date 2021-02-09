const fs = require('fs');
const path = require('path');

const pathToData = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

class Cart {
  static addProduct(id, productPrice, callback) {
    fs.readFile(pathToData, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if(!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProduct = cart.products.find(product => product.id === id);
      if(existingProduct) {
        existingProduct.qty++;
        cart.totalPrice += existingProduct.price;
      } else {
        cart.products.push({ id: id, price: productPrice, qty: 1 });
        cart.totalPrice += productPrice;
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
}

module.exports = Cart;