var express = require('express');
var request = require('request');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/api', urlencodedParser, function (req, res) {
    request({url: 'https://nominatim.openstreetmap.org/search/' + req.body.name + '?format=json'}, function (err, response,data) {
        if(err) return next(err);
        console.log(data);
        res.send(data);
    });
});

var server = http.createServer(app);

server.listen(7788);

module.exports = app;