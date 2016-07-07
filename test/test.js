const request = require('supertest');
const app = require('../app');
describe('name to point', function () {
  it('should return JSON object with geolocation',
      function (done) {
        request(app)
          .get('/point?name=OldCity&lat=53.66&lon=23.83')
          .expect(200)
          .expect({
            lat: '53.70177645',
            lon: '23.8347894179425',
            display_name: 'OldCity, 17, улица Дубко, Девятовка, Ленинский район,' +
            ' Гродно, Гродненская область, 230012, Беларусь',
          })
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            done();
          });
      });
  it('should return an error',
    function (done) {
      request(app)
        .get('/point?name=NONAME&lat=53.66&lon=23.83')
        .expect(404)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });
});
