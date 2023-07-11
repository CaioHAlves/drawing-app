let canvas = document.getElementById("canvas");
let backgroundButton = document.getElementById("color-background");
let colorButton = document.getElementById("color-input");
let clearButton = document.getElementById("button-clear");
let penSize = document.getElementById("pen-slider");
let toolType = document.getElementById("tool-type");
let draw_bool = false;

let context = canvas.getContext("2d");

let mouseX = 0;
let mouseY = 0;

let rectLeft = canvas.getBoundingClientRect().left;
let rectTop = canvas.getBoundingClientRect().top;

const init = () => {
  context.strokeStyle = "black";
  context.lineWidth = 1;

  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  toolType.innerHTML = "Pen";

  canvas.style.backgroundColor = "#ffffff";
  backgroundButton.value = "#ffffff";
};

//Detect touch device
const is_touch_device = () => {
  try {
    //We try to create TouchEvent (it would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};

//Exact x and y position of mouse/touch
const getXY = (e) => {
  mouseX = (!is_touch_device() ? e.pageX : e.touches?.[0].pageX) - rectLeft;
  mouseY = (!is_touch_device() ? e.pageY : e.touches?.[0].pageY) - rectTop;
};

const stopDrawing = () => {
  context.beginPath();
  draw_bool = false;
};

//User has started drawing
const startDrawing = (e) => {
  //drawing = true
  draw_bool = true;
  getXY(e);
  //Start Drawing
  context.beginPath();
  context.moveTo(mouseX, mouseY);
};

//draw function
const drawOnCanvas = (e) => {
  if (!is_touch_device()) {
    e.preventDefault();
  }
  getXY(e);

  if (draw_bool) {
    context.lineTo(mouseX, mouseY);
    context.stroke();
    context.globalCompositeOperation = "source-over";
  }
};

//Mouse down/touch start inside canvas
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("touchstart", startDrawing);

//Start drawing when mouse.touch moves
canvas.addEventListener("mousemove", drawOnCanvas);
canvas.addEventListener("touchmove", drawOnCanvas);

//when mouse click stops/touch stops stop drawing and begin a new path

canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("touchend", stopDrawing);

//When mouse leaves the canvas
canvas.addEventListener("mouseleave", stopDrawing);

//Button for pen mode

// penButton.addEventListener("click", () => {
//   //set range title to pen size
//   toolType.innerHTML = "Pen";
//   erase_bool = false;
// });

//Button for eraser mode
// eraseButton.addEventListener("click", () => {
//   erase_bool = true;
//   //set range title to erase size
//   toolType.innerHTML = "Eraser";
// });

//Adjust Pen size
penSize.addEventListener("input", () => {
  //set width to range value
  context.lineWidth = penSize.value;
});

//Change color
colorButton.addEventListener("change", () => {
  context.strokeStyle = colorButton.value;
});

//Change Background
backgroundButton.addEventListener("change", () => {
  canvas.style.backgroundColor = backgroundButton.value;
});

//Clear
clearButton.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.backgroundColor = "#FFFFFF";
  backgroundButton.value = "#FFFFFF";
  window.location.reload();
});

init();
