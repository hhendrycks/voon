var express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/:zipCode', function (req, res) {
  console.log("zipCode entered");
  axios.get(`https://api.darksky.net/forecast/ae237153c7709888817a299211ff1fcd/30.2672,-97.7431`)
  .then((data) => {
    res.send(data.data);
  })
  .catch((error) => {
    console.log("error in server:", error);
    res.send(error)
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

