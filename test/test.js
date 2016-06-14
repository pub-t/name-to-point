var request = require('supertest');
var app = require('../app');
describe("post should return json", function (){

    it("posts a new user to /users", function(done){
        var json = {
            "place_id": "122867135",
            "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright",
            "osm_type": "way",
            "osm_id": "256182825",
            "boundingbox": [
                "53.701227",
                "53.702108",
                "23.833112",
                "23.8368386"
            ],
            "lat": "53.70177645",
            "lon": "23.8347894179425",
            "display_name": "OldCity, 17, улица Дубко, Девятовка, Ленинский район, Hrodna, Hrodna region, 230012, Belarus",
            "class": "shop",
            "type": "mall",
            "importance": 0.101
        };

        request("http://localhost:7788")
            .post("/api")
            .send('name')
            .expect(200)
            .expect(json, done);
        
    });
});