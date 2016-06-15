require('babel-register');
const express = require('express');
const request = require('request');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/serchСoordinate', urlencodedParser, (req, res, next) => {
  const searchURL = `https://nominatim.openstreetmap.org/search/${req.body.name}?format=json`;
  request({ url: searchURL }, function (err, response, data) {
    if (err) return next(err);
    res.send(data);
  });
});

const server = http.createServer(app);

server.listen(7788);

module.exports = app;
