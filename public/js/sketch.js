let worldMapImg;
let mapMarkerDetails = {
  x: 221,
  y: 50,
  color: "(0,0,0,255)"
}

let selectedCoords = {
  lat: 0,
  long: 0
}


mapCoords = {
  maxX: 0,
  minX: 0,
  maxY: 0,
  minY: 0
}

let sunrise;
let sunset;

function preload() {
  worldMapImg = loadImage("/assets/worldMap.jpg");

}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  imageMode(CENTER);

  mapCoords.minX = width / 2 - 200;
  mapCoords.maxX = width / 2 + 200;
  mapCoords.minY = 50;
  mapCoords.maxY = 350;

}


function draw() {
  background(255);
  image(worldMapImg, width / 2, 200, 400, 300);

  fill(mapMarkerDetails.color);
  ellipse(mapMarkerDetails.x, mapMarkerDetails.y, 10, 10);

}

function mouseClicked() {
  // x: 221 - 620
  // y: 50 - 349


  // console.log('');

  if (mouseX >= mapCoords.minX && mouseX <= mapCoords.maxX && mouseY >= mapCoords.minY && mouseY <= mapCoords.maxY) {

    // y = latitude
    // x = longitude



    mapMarkerDetails.x = mouseX;
    mapMarkerDetails.y = mouseY;

    // console.log(mouseX, mouseY);

    selectedCoords.lat = (map(mouseY, mapCoords.minY, mapCoords.maxY, 83, -75));
    selectedCoords.long = (map(mouseX, mapCoords.minX, mapCoords.maxX, -180, 180));

    getSunData();

  }

}

let params = {
  lat: 0,
  long: 0
}

function getSunData() {

  let url = "/getSunData?lat=" + selectedCoords.lat + "&lng=" + selectedCoords.long;
  console.log(url);


  httpGet(url, (response) => {

    let sunData = JSON.parse(response);

    // console.log('getting sun data', sunData.results);


    sunset = sunData.results.sunset;
    sunrise = sunData.results.sunrise;


    console.log(sunset);
    console.log(sunrise);

  });
}