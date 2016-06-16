const express = require('express');
const request = require('request');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
const nconf = require('./config');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/searchCoordinate', urlencodedParser, function (req, res, next) {
  const searchURL = 'https://nominatim.openstreetmap.org/search/' + req.body.name + '?format=json';
  request({ url: searchURL }, function (err, response, data) {
    if (err) return next(err);
    res.send(data);
  });
});

const server = http.createServer(app);

server.listen(nconf.get('port'));

module.exports = app;
