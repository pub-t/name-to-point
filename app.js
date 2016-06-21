const express = require('express');
const request = require('request');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
const nconf = require('./config');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/searchCoordinate', urlencodedParser, function (req, res, next) {
  const myBody = {
    location: {
      accuracy: 40,
      lat: '53.663482',
      lon: '23.834427',
    },
    to: 'ул. Лиможа 27/1',
  };
  const search = myBody.to + ',' + myBody.location.lat + ' ' + myBody.location.lon;
  /* const searchName = req.body;*/
  const searchURL = 'https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(search) +
    '&format=json';
  request({ url: searchURL }, function (err, response, data) {
    if (err) return next(err);
    res.send({
      lat: '53.70177645',
      lon: '23.8347894179425',
      display_name: 'OldCity, 17, улица Дубко, Девятовка, Ленинский район, Hrodna, Hrodna region, 230012, Belarus',
    });
  });
});
const server = http.createServer(app);

server.listen(nconf.get('port'));

module.exports = app;
