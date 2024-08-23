//Inicial Data
let currentColor = "black"; // selected color
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector("#tela");
let ctx = screen.getContext("2d"); // selecting canvas context

//Events
document.querySelectorAll(".colorArea .color").forEach((item) => {
  item.addEventListener("click", colorClickEvent); // click event to use all colors
});

// mouse events on screen (move, click and release)
screen.addEventListener("mousedown", mouseDownEvent);
screen.addEventListener("mousemove", mouseMoveEvent);
screen.addEventListener("mouseup", mouseUpEvent);
// clear button
document.querySelector(".clear").addEventListener("click", clearScreen);

//functions
function colorClickEvent(e) {
  let color = e.target.getAttribute("data-color");// checking which color was clicked
  currentColor = color;

  document.querySelector(".color.active").classList.remove("active"); // removing the color that is checked by default
  e.target.classList.add("active"); // adding which color you clicked on
}

function mouseDownEvent(e) {
 // Activate drawing mode and capture the exact mouse coordinates within the drawing canvas
  canDraw = true;
  mouseX = e.pageX - screen.offsetLeft;
  mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
  if (canDraw) {
    draw(e.pageX, e.pageY); // mouse position
  }
}

function mouseUpEvent() {
  canDraw = false;
}

function draw(x, y) {
  let pointX = x - screen.offsetLeft; 
  let pointY = y - screen.offsetTop; 

// to design
  ctx.beginPath(); // Starts a new drawing path.
  ctx.lineWidth = 5; // line width
  ctx.lineJoin = "round"; // shape(ball)
  ctx.moveTo(mouseX, mouseY); // move the cursor (start position)
  ctx.lineTo(pointX, pointY);  // Draw a line to the point
  ctx.closePath(); // closing drawing process
  ctx.strokeStyle = currentColor; // color
  ctx.stroke(); // Draw the line with the defined width

 // continuous drawing independent of position
  mouseX = pointX;
  mouseY = pointY;
}

function clearScreen() {
  ctx.setTransform(1, 0, 0, 1, 0, 0); // 2d matrix
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear to the end of the screen
}
