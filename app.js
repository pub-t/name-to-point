const express = require('express');
const request = require('request');
const http = require('http');
const app = express();
const nconf = require('./config');

app.get('/point', (req, res, next) => {
  const myBody = req.query;
  const search = `${myBody.name},${myBody.lat},${myBody.lon}`;
  const searchURL = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}
  &format=json`;
  let resultJSON;
  let valueOfDisplayName;
  let valueOfLat;
  let valueOfLon;
  request({ url: searchURL }, (err, response, data) => {
    if (err) return next(err);
    if (data.length === 2) {
      const myError = new Error('Поиск не дал результатов');
      myError.status = 404;
      return next(myError);
    }
    JSON.parse(data, (key, value) => {
      if (key === 'display_name') {
        valueOfDisplayName = value;
      }
      if (key === 'lat') {
        valueOfLat = value;
      }
      if (key === 'lon') {
        valueOfLon = value;
      }
      resultJSON = {
        display_name: valueOfDisplayName,
        lat: valueOfLat,
        lon: valueOfLon,
      };
    });
    return res.send(resultJSON);
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Ошибка');
});

const server = http.createServer(app);

server.listen(nconf.get('port'));

module.exports = app;
