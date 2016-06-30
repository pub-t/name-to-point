const request = require('supertest');
const app = require('../app');
describe('transforms the name of the object in a coordinate', function () {
  it('Input place name-string,base coordinate, return coordinate and full name point',
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
});
