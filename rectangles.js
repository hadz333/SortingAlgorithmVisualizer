
var c = document.getElementById("myCanvas");
var rectangleSlider = document.getElementById("rectangleSlider");
var speedSlider = document.getElementById("speedSlider");

var values = [];
let num = rectangleSlider.value;
for (i = 0; i < num; i++) {
	// populate the array with values between 20 and 200 for rectangle size
	values[i] = Math.floor(Math.random() * 180) + 20
}

var y = 120;
var x = 0;
var rectWidth = 15;
var ctx = c.getContext("2d");
ctx.beginPath();
for (i = 0; i < values.length; i++) {
	ctx.rect(x, y, rectWidth, values[i]);
	x += rectWidth;
}

ctx.stroke();
