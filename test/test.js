const request = require('supertest');
const app = require('../app');
describe('transforms the name of the object in a coordinate', function () {
  it('Input place name-string,base coordinate, return coordinate and full name point',
      function (done) {
        request(app)
          .post('/searchCoordinate')
          .send({
            location: {
              accuracy: 40,
              lat: '53.663482',
              lon: '23.834427',
            },
            name: 'ул. Лиможа 27/1',
          })
          .expect(200)
          .expect({
            lat: '53.70177645',
            lon: '23.8347894179425',
            display_name: '27/1, улица Лиможа, Девятовка–4, Ленинский район, ' +
            'Hrodna, Hrodna region, 230021, Belarus',
          })
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            done();
          });
      });
});
