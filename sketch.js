let whiteDots = []; // empty array to save the white dots in the background
let coloredCircles = []; //empty array to save the attributes about the circle

//create a class for all the circles
class ColoredCircle {
  constructor(x, y, radius, colors) { //this class inlcude the x and y position of the circle, its radius and color
    this.position = createVector(x, y);  //createVector() is a function to create a two-dimensional vector
    this.radius = radius;
    this.colors = colors;
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

function setup() {
  //let the width and height became the size of the canvas
  createCanvas(windowWidth, windowHeight); 
  drawCircles(); 
}

function draw() {
  drawBackground(); 
  for (let circle of coloredCircles) {
    circle.draw();
  }
}

function drawCircles() {
  // randomly create the position for the white dots on the background
  for (let i = 0; i < 250; i++) { //create 250 dots
    let x = random(width); //random x position
    let y = random(height); //random y position
    //createVector() is a function to create a two-dimensional vector
    //after random the position, add the position to the array
    whiteDots.push(createVector(x, y)); 
  }

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
}

function drawBackground() {
  background(4, 80, 111); //set background color
  for (let dot of whiteDots) { //draw white dots on the background
    noStroke();
    fill(255);
    ellipse(dot.x, dot.y, 15); //based on the dot's position in the whiteDots array, draw the dot
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); //to make the canvas fit the screen
  whiteDots = []; // after resize the canvas, make the array empty
  drawCircles();  //redraw the drawCircles() function
}
