'use strict'

var w = 600;
var h = 600;
var step = 20; 
var canvasElementId = 'grid';
var canvas = document.getElementById(canvasElementId);
canvas.width  = w;
canvas.height = h;
var ctx = canvas.getContext('2d');

var drawGrid = function(ctx, w, h, step) {
    ctx.beginPath(); 
    for (var x=0;x<=w;x+=step) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
    }
    ctx.strokeStyle = 'rgb(20,20,20)';
    ctx.lineWidth = 0.5;
    ctx.stroke(); 
    ctx.beginPath(); 
    for (var y=0;y<=h;y+=step) {
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
    }
    ctx.strokeStyle = 'rgb(20,20,20)';
    ctx.lineWidth = 0.5;
    ctx.stroke(); 
};

function parametrsChange (id, value){
  if (id == "gridStep"){
    document.getElementById("gridStepSpan").innerHTML = value;
    // redrawBackground(value);
    // console.log(value)
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawGrid(ctx, w, h, Number(value));
  }
  if (id == "meterSize"){
    document.getElementById("meterSizeSpan").innerHTML = value;
  }
}

function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();
  return { x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}

function updateReadout(x, y) {
  readout.innerText = '(' + x.toFixed(1) + ', ' + y.toFixed(1) + ')';
}
  
// Event handlers
canvas.onmousemove = function (e) {
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
  updateReadout(
                loc.x * document.getElementById("meterSize").value / document.getElementById("gridStep").value ,
                loc.y * document.getElementById("meterSize").value/ document.getElementById("gridStep").value
                );
            };

canvas.onmousedown = function (e) {
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
  console.log(
              (loc.x/20).toFixed(0) * document.getElementById("meterSize").value,
              (loc.y/20).toFixed(0) * document.getElementById("meterSize").value
              )
}

drawGrid(ctx, w, h, step);


