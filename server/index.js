var express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');
const { Client } = require('pg')
const dotenv = require('dotenv').config();
const db = new Client(`postgres://${process.env.USERNAME}:${process.env.PASSWORD}@localhost:5432/voon`);

db.connect();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/:zipCode', function (req, res) {
  const query = db.query(`SELECT lat, lng FROM zipcodes WHERE id = '${req.params.zipCode}'`)
  .then((row) => {
    const { lat, lng } = row.rows[0];
    axios.get(`https://api.darksky.net/forecast/${process.env.APIKEY}/${lat},${lng}`)
    .then((data) => {
      res.send(data.data);
    })
  })
  .catch((err) => res.send(err));
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

