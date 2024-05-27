let coloredCircles = []; //empty array to save the attributes about the circle

let noiseOffset = 0; // noice offset for movement, it was set as 0 first

let coloredDots = []; // empty array to save the colored dots

//create a class for all the circles
class ColoredCircle {
  constructor(x, y, radius, colors) { //this class inlcude the x and y position of the circle, its radius and color
    this.position = createVector(x, y);  
    //createVector() is a function that creates a two-dimensional vector.
    //In the code, createVector(x, y) is used to specify the center coordinates of the circle, which is a two-dimensional vector, 
    //so we use this function to conveniently represent the position of the circle in the code. 
    this.radius = radius;
    this.colors = colors;
  }

  // use update to update colored circle's position based on noise
  update() {
    //use noise to generate smooth movement
    //get x movement and y movement based on the current circle's position and noise, map noise from (0, 1) to the range (-2, 2).
    let xMove = map(noise(this.position.x * 0.01, this.position.y * 0.01, noiseOffset), 0, 1, -2, 2);
    let yMove = map(noise(this.position.y * 0.01, this.position.x * 0.01, noiseOffset), 0, 1, -2, 2);
  
    //update its position
    this.position.add(createVector(xMove, yMove));
}

  draw() {
    noStroke();
    //fill the first color in the color array, which is the color for the large circle
    fill(this.colors[0]);
    ellipse(this.position.x, this.position.y, this.radius * 2); //the radius for the large circle is 120, in the drawCircles() function
    
    //fill the second color in the color array, which is the color for the meidum circle
    fill(this.colors[1]);
    ellipse(this.position.x, this.position.y, 150); //the radius for the medium circle is 150
    
    //fill the third color in the color array, which is the color for the small circle
    fill(this.colors[2]);
    ellipse(this.position.x, this.position.y, 80); //the radius for the samll circle is 80
  }
}

// create a class for all the colored dots
class ColoredDot {
  constructor(x, y) { //this class only include dots' x and y position
    this.position = createVector(x, y);
    this.radius = 8;  //the radius of the dot is set asa 8
    this.color = color(random(255), random(255), random(255)); // the color of the dot is random select
  }

  // update the dot's position based on noise
  update() {
    // use noise to generate smooth movement
    //get x movement and y movement based on the current dot's position and noise, map noise from (0, 1) to the range (-2, 2).
    let xMove = map(noise(this.position.x * 0.01, this.position.y * 0.01, noiseOffset), 0, 1, -1, 1);
    let yMove = map(noise(this.position.y * 0.01, this.position.x * 0.01, noiseOffset), 0, 1, -1, 1);
    
    // update dot's position
    this.position.add(createVector(xMove, yMove));
  }

  draw() {
    noStroke();
    fill(this.color);  //fill the random color
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }
}


//set up canvas
function setup() {
  //let the width and height became the size of the canvas
  createCanvas(windowWidth, windowHeight); 
  drawCircles(); 
}

function draw() {
  drawBackground(); 
  updateCirclesPosition(); //update the position of the circle
  updateDotsPosition(); // update the position of colored dots

  //draw colored circles
  for (let circle of coloredCircles) {
    circle.draw();
  }

  //draw colored dots
  for (let dot of coloredDots) {
    dot.draw();
  }
}

//this function is to upate circles' position
function updateCirclesPosition() {
  noiseOffset += 0.01;  // increase the noise slightly to create a smooth movement
  
  for (let circle of coloredCircles) {
    circle.update(); //update position for each circle
  }
}

//this function is to upate dots' position
function updateDotsPosition() {
  for (let dot of coloredDots) {
    dot.update();  //update position for each dot
  }
}

function drawCircles() {
  coloredCircles = [];
  //array large circles color
  let largeCircleColors = [
    color(217, 233, 237),
    color(174, 195, 112),
    color(253, 185, 93),
    color(255, 200, 198),
    color(246, 232, 141),
    color(235, 203, 246),
    color(67, 200, 176)
  ];

  //medium circles color
  let mediumCircleColors = [
    color(14, 13, 116),
    color(9, 102, 23),
    color(244, 68, 46),
    color(229, 83, 192),
    color(239, 126, 45),
    color(253, 185, 93),
    color(250, 251, 253)
  ];

  //small circles color
  let smallCircleColors = [
    color(244, 147, 96),
    color(228, 93, 86),
    color(0, 0, 0),
    color(174, 195, 112),
    color(38, 75, 207),
    color(155, 100, 209),
    color(63, 73, 97)
  ];

  //circles' x and y position
  let circlePositions = [
    createVector(width * 0.4, height * 0.1),
    createVector(width * 0.1, height * 0.35),
    createVector(width * 0.85, height * 0.25),
    createVector(width * 0.5, height * 0.5),
    createVector(width * 0.15, height * 0.75),
    createVector(width * 0.55, height * 0.9),
    createVector(width * 0.9, height * 0.73)
  ];

  //the for loop goes through each position in the circlePositions array
  for (let i = 0; i < circlePositions.length; i++) { 
    //get the color at position i in the array,and combines them into a array called colorsSet
    let colorsSet = [largeCircleColors[i], mediumCircleColors[i], smallCircleColors[i]];
    //based on the position, radius and color, create a new ColoredCircle object and add it to the coloredCircles array
    //the radisu for the large circle is 120
    coloredCircles.push(new ColoredCircle(circlePositions[i].x, circlePositions[i].y, 120, colorsSet));
  }

   // create colored dots at random positions
   for (let i = 0; i < 100; i++) {
    let x = random(width); //random x position
    let y = random(height); //random y position
    coloredDots.push(new ColoredDot(x, y)); 
  }
}

function drawBackground() {
 //I changed the background color to purple
 background (60,49,100, 20);  //make the alpha value as 20 to make the trace disappear slowly 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); //to make the canvas fit the screen
  coloredDots = []; //make the colored dots array emptey when resize the window
  drawCircles();  //redraw the drawCircles() function
}
