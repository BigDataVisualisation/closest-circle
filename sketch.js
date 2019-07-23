var data = [];
var ready = false;

//zur einfachheit hats hier keine scales

function setup() {
  createCanvas(800, 600);

  noLoop();
  d3.csv("circles.csv", function (d) {
    return {
      x: +d.x,
      y: +d.y,
      value: +d.value,
    };
  }).then(function (csv) {
    data = csv;
    ready = true;
    redraw();
  });
}

function draw() {

  if (!ready) {
    background(255, 0, 0);
    return;
  } else {
    background(250);
  }

  var closest = getClosest(data,mouseX,mouseY);

  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    
    var x = d.x;
    var y = d.y;
    var r = d.value;

    if(d == closest){
      fill(255,0,0);
    }
    else{
      fill(0);
    }
    ellipse(x,y,r,r);
  }
}

function mouseMoved() {
  redraw();
}

function getClosest(arr,x,y){
  var thresholdDist = 50;
  var closest = null;
  var minDist = Number.MAX_VALUE;

  for (let i = 0; i < arr.length; i++) {
    var d = arr[i];
    var distance = dist(x,y,d.x,d.y);
    if(distance<minDist){
      minDist = distance;
      closest = d;
    }
  }

  return minDist < thresholdDist ? closest : null;
}

