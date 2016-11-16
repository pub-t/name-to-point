# name-to-point
Преобразует локальное имя объекта в координату

### Install dependencies
`npm install`

### How to run?
* **Multi-OS**
`npm start`

### How to work?
- `GET /location`  for get geolocation points. Example:
```
GET /location?name=ул.%20Лиможа&base=Гродно
[
   {
      name: "улица Лиможа, Девятовка–1, Ленинский район, Гродно, Гродненская область, 230021,
      Беларусь",
      lat: "53.7069309",
      lon: "23.8496624"
   },
...
]
```
- `GET /address` for get address. Example:
```
GET /address?lat=53.70177645&lon=23.8347894179425
[
   {
      name: "OldCity, 17, улица Дубко, Девятовка, Ленинский район, Гродно, Гродненская область, 230005, Беларусь"
   }
]
```
