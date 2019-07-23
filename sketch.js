var data = [];
var ready = false;

//mappen der Stadtnamen
var yScale = d3.scalePoint();

//mappen der population
//funktioniert ähnlich wie map() von p5
var xScale = d3.scaleLinear();

var chartWidth = 400;
var chartHeight = 200;

function setup() {
  createCanvas(800, 600);

  d3.csv("population.csv", function (d) {

    return {
      population: +d.population,
      city: d.city,
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

  var maxPop = d3.max(data,function(d){
    return d.population;
  });
  xScale.domain([0,maxPop])
    .range([0,chartWidth]);

  var cities = d3.set(data,function(d){
    return d.city;
  }).values();

  //cities is eine list der stadtnamen
  console.log(cities);

  var barHeight = 30;

  yScale.domain(cities)
    .range([0,chartHeight-barHeight]);

  for (var i = 0; i < data.length; i++) {
    var d = data[i];
  
    var barWidth = xScale(d.population);
    var y = yScale(d.city);

    fill('#035E72');
    noStroke();
    rect(0,y,barWidth,barHeight);

    fill(0);
    textAlign(LEFT,CENTER);
    text(d.city,barWidth+10,y+0.5*barHeight);
  }
}