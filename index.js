const express = require('express');
const request = require('request');
const app     = express();
const PORT    = 3000;

// tell our app where to serve our static files
app.use(express.static('public'));

// --------------------------------------------------------
// define a route - what happens when people visit /
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// --------------------------------------------------------
// wrap an api request in our own endpoint
app.get('/getFilmData', function(req, res) {
  
  let ghibliFilmsUrl = 'https://ghibliapi.herokuapp.com/films';
  let options = {
    json: true 
  };

  // make an api request to the ghibli api /films endpoint
  request(ghibliFilmsUrl, options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    } else {
      res.send(err);
    }
  }); 
});

// --------------------------------------------------------
// tell our app where to listen for connections
app.listen(PORT, function() {
  console.log('listening on PORT: ' + PORT);
});