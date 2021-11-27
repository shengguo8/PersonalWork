xPosOne = 100;
yPosOne = 100;
xPosTwo = 300;
yPosTwo = 300;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  playerOne = createVector(0,0);
  background(220);
  ellipse(xPosOne, yPosOne, 20, 20);
  ellipse(xPosTwo, yPosTwo, 20, 20);
}
