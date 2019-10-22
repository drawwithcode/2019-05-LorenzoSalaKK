var x;
var y;
var mic;
var mybg;
var pot;
var cop;
var open;
var remap;
var player;
var capture;

function preload() {
  mybg = loadImage("./assets/background.jpg");
  cop = loadImage("./assets/coperchio.png");
  pot = loadImage("./assets/pot.png");
  player = loadImage("./assets/player.png")
}

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  mic = new p5.AudioIn();
  mic.start();
  angleMode(DEGREES);

  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
}

function draw() {
  background(mybg);

  var myText = "Use < and > to open the pot and play the bagpipe to make the snake dance! \n If it doesn't work, try to click on the 'Loading...' text";

  textFont("Arial");
  textAlign(CENTER);
  textSize(30);
  fill('black');
  strokeWeight(2);
  stroke('white')
  text(myText, width/2, height/5);


  var myImage = capture.loadPixels();
  image(myImage, windowWidth / 15.5, windowHeight / 2.35, 320 * 1.2, 240 * 1.2);

  var ang = 0;
  var volume = mic.getLevel();
  remap = map(volume, 0, 0.4, windowHeight * 4.7 / 6, windowHeight * 2 / 5);
  console.log(volume);
  console.log(open);

  speed = cop.width / 4;
  x = windowWidth / 2 - (cop.width / 8);
  y = windowHeight * 2 / 3;

  poty = windowHeight * 2 / 3;
  d = 15;

  if (keyIsDown(LEFT_ARROW)) {
    x += -speed;
    ang = -5;
    open = true;
  } else if (keyIsDown(RIGHT_ARROW)) {
    x += speed;
    ang = 5;
    y = windowHeight * 2 / 3 - cop.height / 5.45;
    open = true;
  } else {
    open = false;
  }

  if (open == true) {
    snake();
    console.log('serpe')
  } else {

  }

  image(pot, windowWidth / 2 - (pot.width / 8), poty, pot.width / 4, pot.height / 4);
  push();
  rotate(ang);
  image(cop, x, y, cop.width / 4, cop.height / 4);
  pop();
  image(player, 0, windowHeight / 3, player.width, player.height);
}

function snake() {
  var snakex = windowWidth / 2;
  var snakeheadx = snakex + Math.round(random(-5, 5));
  var snakeheady = Math.round(remap);
  var snakey = windowHeight * 4.7 / 6;
  var tongueendx = snakeheadx + random(-2, 2);
  var tongueendy = snakeheady - random(35, 40);


  strokeWeight(50);
  stroke('green');
  line(snakex, snakey, snakeheadx, snakeheady); //snake body

  strokeWeight(6);
  stroke('red');
  line(snakeheadx, snakeheady - 25, tongueendx, tongueendy); //tongue base
  line(tongueendx, tongueendy, tongueendx - 5, tongueendy - 5); //left last part of tongue
  line(tongueendx, tongueendy, tongueendx + 5, tongueendy - 5); //right last part of tongue
}
