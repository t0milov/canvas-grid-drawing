'use strict'

var w = 2000;
var h = 2000;
var step = 20;
var canvasElementId = 'grid';
var canvas = document.getElementById(canvasElementId);
canvas.width = w;
canvas.height = h;
var ctx = canvas.getContext('2d');
var polygonVertices = [];

var drawGrid = function (ctx, w, h, step) {
  ctx.beginPath();
  for (var x = 0; x <= w; x += step) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  ctx.strokeStyle = '#1184c7';
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.beginPath();
  for (var y = 0; y <= h; y += step) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }

  ctx.strokeStyle = '##1184c7';
  ctx.lineWidth = 0.5;
  ctx.stroke();
};

function parametrsChange(id, value) {
  if (id == "gridStep") {
    document.getElementById("gridStepSpan").innerHTML = value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, w, h, Number(value));
    grawPolyLines();
  }
  if (id == "meterSize") {
    document.getElementById("meterSizeSpan").innerHTML = value;
  }
}

function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}

function updateReadout(x, y) {
  readout.innerText = '(' + x.toFixed(1) + ', ' + y.toFixed(1) + ')';
}

function grawPolyLines() {
  ctx.strokeStyle = 'rgb(0,0,0)';
  ctx.lineWidth = 1;
  try {
    for (var point = 0; point < polygonVertices.length - 1; point++) {
      ctx.beginPath();
      ctx.moveTo(polygonVertices[point][0] * document.getElementById("gridStep").value,
                 polygonVertices[point][1] * document.getElementById("gridStep").value);
      ctx.lineTo(polygonVertices[point + 1][0] * document.getElementById("gridStep").value,
                 polygonVertices[point + 1][1] * document.getElementById("gridStep").value);
      ctx.closePath();
      ctx.stroke();
    }
  } catch (e) {
    console.log(e.message)
  }
}

function addPolygonVertex(x_grid, y_grid) {
  polygonVertices.push([x_grid, y_grid])
  var a = "[" + x_grid.toFixed(1).toString() + ", " + y_grid.toFixed(1).toString() + "],"
  document.getElementById("canvasData").append(a + "\n")
  }

function getDataFromTextarea() {

  var text = document.getElementById("canvasData").value
  // text = JSON.parse(text)
  console.log(text)
}

// Events
canvas.onmousemove = function (e) {
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
  updateReadout(
    loc.x * document.getElementById("meterSize").value / document.getElementById("gridStep").value,
    loc.y * document.getElementById("meterSize").value / document.getElementById("gridStep").value
  );
};

canvas.onmousedown = function (e) {
  // document.getElementById("gridStepSpan").innerHTML = value;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(ctx, w, h, Number(document.getElementById("gridStep").value));
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
  addPolygonVertex(loc.x / (document.getElementById("gridStep").value),
    loc.y / (document.getElementById("gridStep").value));
  grawPolyLines();
  console.log(
    (loc.x * document.getElementById("meterSize").value / document.getElementById("gridStep").value).toFixed(1),
    (loc.y * document.getElementById("meterSize").value / document.getElementById("gridStep").value).toFixed(1)
  )
}

drawGrid(ctx, w, h, step);


