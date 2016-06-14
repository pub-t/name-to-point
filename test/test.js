var request = require('supertest');
var app = require('../app');
describe("transforms the name of the object in a coordinate", function (){

    it("Input place name-string,base coordinate, return coordinate and full name point", function(done){

        request(app)
            .post("localhost:7788/serchСoordinate")
            .send({SearchString:'Oldcity', BaseСoordinate: {lat: "53.93892", lon: "28.6496"}}) //текс + координата базовая
            .expect(200)
            .expect({lat: "53.70177645", lon: "23.8347894179425",
                display_name: "OldCity, 17, улица Дубко, Девятовка, Ленинский район, Hrodna, Hrodna region, 230012, Belarus"});
            done();
        
    });
    
});