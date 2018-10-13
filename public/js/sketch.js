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

let font,
  fontsize = 200;


let daytime = true;

let sunDownAmount = 0;
let moonDownAmount = 0;





function preload() {
  worldMapImg = loadImage("/assets/worldMap.jpg");
  font = loadFont('../assets/ArialUnicode.ttf');

}

function setup() {
  createCanvas(window.innerWidth, 2000);

  imageMode(CENTER);

  mapCoords.minX = width / 2 - 200;
  mapCoords.maxX = width / 2 + 200;
  mapCoords.minY = 50;
  mapCoords.maxY = 350;

  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);

}


function draw() {
  // background(255);

  var color1 = color(242, 249, 253);
  var color2 = color(245, 207, 192);
  setGradient(0, 0, windowWidth, 2000, color1, color2, "Y");


  if (daytime) {
    sunDownAmount = 0;
    moonDownAmount = 1200;
  } else {
    sunDownAmount = 1200;
    moonDownAmount = 0;
  }

  textAlign(LEFT);
  drawSun(450 + sunDownAmount);
  textAlign(RIGHT);
  drawMoon(450 + moonDownAmount);


  image(worldMapImg, width / 2, 200, 400, 300);

  stroke("black")
  fill(mapMarkerDetails.color);
  ellipse(mapMarkerDetails.x, mapMarkerDetails.y, 10, 10);

}

function mouseClicked() {
  // x: 221 - 620
  // y: 50 - 349


  // console.log('');

  if (mouseX >= mapCoords.minX && mouseX <= mapCoords.maxX && mouseY >= mapCoords.minY && mouseY <= mapCoords.maxY) {


    mapMarkerDetails.x = mouseX;
    mapMarkerDetails.y = mouseY;

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


    sunset = new Date(sunData.results.sunset);
    sunrise = new Date(sunData.results.sunrise);


    console.log(sunrise);
    console.log(sunset);



    // let now = new Date().now();

    let millisUntilSunset = sunset - Date.now();
    console.log("time until sunset: " + millisUntilSunset);

    let millisSinceSunrise = Date.now();
    console.log("time since sunrise: " + millisSinceSunrise);



    if (millisUntilSunset > 0) {
      daytime = true;
    } else {
      daytime = false;
    }




    // console.log(now - sunrise);
    // console.log("time until sunset: " + sunset - now);





  });
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") { // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis == "X") { // Left to right gradient
    for (let j = x; j <= x + w; j++) {
      var inter2 = map(j, x, x + w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y + h);
    }
  }
}

function drawSun(y) {
  fill(236, 235, 138);
  stroke(242, 249, 253);
  strokeWeight(2);
  text("☼", width * 0.6, y);

}

function drawMoon(y) {
  fill(236, 215, 226);
  stroke(242, 249, 253);
  strokeWeight(2);
  text("☾", width * 0.4, y);

}