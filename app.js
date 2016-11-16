const express = require('express');
const request = require('request');
const http = require('http');
const app = express();
const nconf = require('./config');
const _ = require('lodash');

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

app.get('/location', (req, res, next) => { // eslint-disable-line consistent-return
  const nameOfLocation = req.query.name;
  let basicSearchPoint = req.query.base;
  if (!nameOfLocation) {
    const queryError = new Error('Bad request. Query "name" is not found or missing');
    queryError.status = 400;
    return next(queryError);
  }
  if (!basicSearchPoint) {
    basicSearchPoint = 'Гродно';
  }
  const queryString = `${nameOfLocation}, ${basicSearchPoint}`;
  const queryURL = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(queryString)}
  &format=json`;
  request(queryURL, (err, response, data) => {
    if (err) return next(err);
    if (response.statusCode !== 200) {
      const requestError = new Error('Search returns Not Found');
      requestError.status = 404;
      return next(requestError);
    }
    const parseJSONData = JSON.parse(data);
    const result = _
      .chain(parseJSONData)
      .map((o) => { // eslint-disable-line arrow-body-style
        return {
          name: o.display_name,
          lat: o.lat,
          lon: o.lon,
        };
      })
      .valueOf();

    return res.send(result);
  });
});

app.get('/address', (req, res, next) => { // eslint-disable-line consistent-return
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);
  if (!Number(lat) || !Number(lon)) {
    const numberError = new Error('Query params is not a Number or query is not found or missing');
    numberError.statusCode = 401;
    return next(numberError);
  }
  res.send();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Ошибка');
});

const server = http.createServer(app);

server.listen(nconf.get('port'));

module.exports = app;
