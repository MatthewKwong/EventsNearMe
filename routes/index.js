let express = require('express');
let server = express.Router();

/* GET home page. */
server.get('/', (req, res, next) => {
  res.render('none', { title: 'Hello, world' });
});

module.exports = server;
