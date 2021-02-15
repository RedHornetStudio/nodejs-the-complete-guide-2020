const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pageNotFoundRoutes = require('./routes/page-not-found');
const db = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const port = 3000;

db.execute('SELECT * FROM products')
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRoutes);
app.use(shopRoutes);

app.use(pageNotFoundRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});