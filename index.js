const express = require('express');
const request = require('request');
const app = express();
const PORT = 3000;

// tell our app where to serve our static files
app.use(express.static('public'));

// --------------------------------------------------------
// define a route - what happens when people visit /
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/getSunData', (req, res) => {
  let url = "https://api.sunrise-sunset.org/json"
  // url = "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400"
  //https://api.sunrise-sunset.org/json?lat=34.02&lng-110.7
  //lat=34.02&lng=-110.7
  url = "https://api.sunrise-sunset.org/json?lat=" + req.query.lat + "&lng=" + req.query.lng + "&formatted=0";

  console.log(url);
  console.log(req.query.lat, req.query.lng);

  //request.query.token


  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    } else {
      res.send(err);
    }
  });

});


// --------------------------------------------------------
// tell our app where to listen for connections
app.listen(PORT, function () {
  console.log('listening on PORT: ' + PORT);
});