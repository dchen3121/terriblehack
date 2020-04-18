let position, velocity, camera;
let lastHeading = 0;
let font;

let catHeading, catPosition;

function preload() {
  font = loadFont('https://cdn.jsdelivr.net/npm/@typopro/dtp-e-b-garamond@3.7.5/TypoPRO-EBGaramond-Regular.ttf');
}

function setup() {
  const canvas = createCanvas(700, 400, WEBGL);
  canvas.parent('canvasContainer');

  position = createVector(0, 0, 0);
  velocity = createVector(0, 0, 0);
  camera = createVector(0, 0, 0);
  textFont(font);

  catHeading = 0;
  catPosition = createVector(-800, 0, -100);
}

function update() {
  velocity.x = 0;
  velocity.y = 0;
  velocity.z = 0;
  
  if (keyIsDown(65)) { 
    velocity.x -= 5; 
  }
  if (keyIsDown(68)) { 
    velocity.x += 5; 
  }
  if (keyIsDown(87)) { 
    velocity.z -= 5; 
  }
  if (keyIsDown(83)) { 
    velocity.z += 5; 
  }
  
  position.add(velocity);
  
  camera.add(position.copy().sub(camera).mult(0.2));

  catHeading += random(-0.04, 0.04);
  catPosition.add(0.4*cos(catHeading), 0, 0.4*sin(catHeading));
}

function draw() {
  update();
  
  background(0);
  ambientLight(50);
  directionalLight(255, 0, 0, 0.25, 0.25, 0);
  pointLight(0, 0, 255, width/2, height/2, 250);
  
  scale(0.4);
  rotateX(-PI/8);
  translate(-camera.x, 100, -camera.z + 200);
  
  push();
  fill(255);
  textSize(50);
  textAlign(CENTER);
  text("Welcome to TerribleHack:\nReal Life", -200, -300);
  textSize(30);
  text("Explore with WASD", -200, -150);
  pop();
  
  push();
  const walking = velocity.magSq() > 0;
  translate(position.x, position.y, position.z);
  
  push();
  if (walking) {
    lastHeading = PI/2 + atan2(-velocity.z, velocity.x);
  }
  rotateY(lastHeading);
  person(walking);
  pop();
  
  translate(0, -250, 0);
  textSize(24);
  fill(255);
  textAlign(CENTER);
  text("YOU", 0, 0);
  pop();
  
  push();
  translate(300, 0, 300);
  busStop();
  pop();

  push();
  translate(catPosition.x, catPosition.y, catPosition.z);
  petCat(catHeading);
  pop();
}