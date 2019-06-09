require('../config/config');
const fs = require('fs');
const path = require('path');
const passport = require('passport');
const api = require('./api');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');

const resolve = file => path.resolve(__dirname, file);
const app = express();

const port = process.env.PORT;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/dist', express.static(resolve('../dist')));
app.use(api);

app.get('/*', function (req, res) {
  const fileName = 'index.html';
  const html = fs.readFileSync(resolve('../' + fileName), 'utf-8');
  res.send(html);
})

app.listen(port, function () {
  console.log('Visit http://localhost:' + port);
})

module.exports = app