var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var size = 5;
var palette = document.getElementById("palette");
var decrease = document.getElementById("decrease");
var increase = document.getElementById("increase");
var sizeSpan = document.getElementById("sizeSpan");
var pen = document.getElementById("pen");
var eraser = document.getElementById("eraser");
var download = document.getElementById("download");
var isPressed = false;
var x,y,x2,y2;
var color = "#ec8c6e";
var color2 = "#ec8c6e";
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
pencil();



/* ---------------------------------------------------------------------------*/


canvas.addEventListener("mousedown",(e)=>{
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});


canvas.addEventListener("mousemove",(e)=>{
  if (isPressed) {
    x2 = e.offsetX;
    y2 = e.offsetY;
    drawCircle(x2,y2);                                                          // drawing functions
    drawLine(x,y,x2,y2);
    x = x2;
    y = y2;
  }
});


canvas.addEventListener("mouseup",()=>{
  isPressed = false;
  x = undefined;
  y = undefined;
});


canvas.addEventListener("mouseleave",()=>{
  isPressed = false;                                                            // drawing functions
  x = undefined;
  y = undefined;
});


function drawCircle(x,y){
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1,y1,x2,y2){
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;                                                      // drawing functions
  ctx.lineWidth = size * 2;
  ctx.stroke();
}




/* ---------------------------------------------------------------------------*/

var bigger;
var smaller;
var presd = false, presd2 = false;

increase.addEventListener("click",function(){
    size++;
    if (size>40) {
      size = 40;                                                                // when the increase button isclicked
    }
    sizeSpan.innerText = size;
});

increase.addEventListener("mousedown",function(){
 bigger = setInterval(function(){
              size++;
              if (size>40) {                                                    // when the increase button is pressed
                size = 40;
              }
              sizeSpan.innerText = size;
            },80);
            presd = true;
});




decrease.addEventListener("click",function(){
  size--;
  if (size<1) {
    size = 1;                                                                 // when the decrease button is clicked
  }
  sizeSpan.innerText = size;
});

decrease.addEventListener("mousedown",function(){
 smaller = setInterval(function(){
              size--;
              if (size<1) {
                size = 1;                                                       // when the decrease button is pressed
              }
              sizeSpan.innerText = size;
            },80);
            presd2 = true;
});


document.body.onmouseup = function(){
  if (presd || presd2) {
    clearInterval(bigger);
    clearInterval(smaller);                                                     // stopping increasing or decreasing
    presd = false;
    presd2 = false;
  }
}



/* ---------------------------------------------------------------------------*/




palette.addEventListener("input",function(){
  color2 = palette.value;                                                       // when the input color is changed
  if (eraser.classList.contains("actived")==false) {
    color = palette.value;
  }
});



/* ---------------------------------------------------------------------------*/


pen.addEventListener("click",pencil);
function pencil(){
  pen.classList.add("actived");
  eraser.classList.remove("actived");
  color = color2;
  pen.style.background = "#ff7aaa";
  pen.style.color = "#2a2a58";
  eraser.style.background = "#2a2a58";
  eraser.style.color = "#9fa1d4";
  canvas.style.cursor = "url('pen.png'), auto";
  eraser.onmouseover = function(){if(this.classList.contains("actived")==false){eraser.style.background = "#3b5378";}}
  eraser.onmouseout = function(){if(this.classList.contains("actived")==false){eraser.style.background = "#2a2a58";}}
};
                                                                                // pen or eraser selection (styling with classlist didn't work)
eraser.addEventListener("click", function(){
  eraser.classList.add("actived");
  pen.classList.remove("actived");
  color2 = color;
  color = "#ffffff";
  eraser.style.background = "#ff7aaa";
  eraser.style.color = "#2a2a58";
  pen.style.background = "#2a2a58";
  pen.style.color = "#9fa1d4";
  canvas.style.cursor = "url('eraser.png'), auto";
  pen.onmouseover = function(){if(this.classList.contains("actived")==false){pen.style.background = "#3b5378";}}
  pen.onmouseout = function(){if(this.classList.contains("actived")==false){pen.style.background = "#2a2a58";}}
});



/* ---------------------------------------------------------------------------*/


document.getElementById("clear").addEventListener("click", () => {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);                              // Clear All Function
});


/* ---------------------------------------------------------------------------*/


download.addEventListener("click",()=>{
  var link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();                                               // Download Canvas as Image
  link.click();
  link.delete;
});
