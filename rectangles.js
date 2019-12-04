
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#6395e6";
var rectangleSlider = document.getElementById("rectangleSlider");
var speedSlider = document.getElementById("speedSlider");

var speed = speedSlider.value;

var values = [];
var numRectangles = 5;
generateRectangles(numRectangles);

function updateSlider(newValue) {
	generateRectangles(newValue);
	console.log("New rectangle amount: ", newValue);
}

function updateSpeed(newValue) {
	speed = newValue;
	console.log("speed changed to:", speed);
}



function generateRectangles(numRectangles) {
	this.numRectangles = numRectangles;
	values = [];
	for (i = 0; i < numRectangles; i++) {
		// populate the array with values between 20 and 200 for rectangle size
		values[i] = Math.floor(Math.random() * 180) + 20
	}

	redraw();
}

function redraw() {
	var y = 0;
	var x = 0;
	var rectWidth = 15;

	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	for (i = 0; i < values.length; i++) {
		ctx.fillRect(x, y, rectWidth, values[i]);
		x += rectWidth + 2;
	}

	ctx.stroke();
}

function swapRectangles(i, j) {
	// 17 is rectangle width + space between rectangles
	var x1 = 17 * i;
	var x2 = 17 * j;
	ctx.clearRect(x1, 0, 15, c.height);
	ctx.clearRect(x2, 0, 15, c.height);
	ctx.fillRect(x1, 0, 15, values[i]);
	ctx.fillRect(x2, 0, 15, values[j]);
	//ctx.stroke();
}

function colorRectangles(i, j, color) {
	var x1 = 17 * i;
	var x2 = 17 * j;
	ctx.fillStyle = color;
	ctx.fillRect(x1, 0, 15, values[i]);
	ctx.fillRect(x2, 0, 15, values[j]);
}

// reset rectangles to blue color
function resetRectangles(i, j) {
	var x1 = 17 * i;
	var x2 = 17 * j;
	ctx.clearRect(x1, 0, 15, c.height);
	ctx.clearRect(x2, 0, 15, c.height);
	ctx.fillStyle = "#6395e6";
	ctx.fillRect(x1, 0, 15, values[i]);
	ctx.fillRect(x2, 0, 15, values[j]);
}

// chooses the kind of sort to run
function chooseSort() {
	if (document.getElementById('merge').checked) {
  		mergeSort();
	} else if (document.getElementById('quick').checked) {
  		quickSort();
	} else if (document.getElementById('heap').checked) {
		heapSort();
	} else if (document.getElementById('bubble').checked) {
		bubbleSort();
	}
}

function mergeSort() {
	console.log("merge");
}

function quickSort() {
	console.log("quick");
}

function heapSort() {
	console.log("heap");
}

async function bubbleSort() {
	console.log("bubble");
	var n = values.length;
	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			// green shows the two rectangles are being compared
			colorRectangles(j, j + 1, "#6fed4c");
			await sleep(1000 / speed);
			if (values[j] > values[j + 1]) {
				// make rectangles red
				colorRectangles(j, j + 1, "#fc3b19");
				// swap the two values
				let temp = values[j];
				values[j] = values[j + 1];
				values[j + 1] = temp;
				
				await sleep(1000 / speed);
				swapRectangles(j, j + 1);
				await sleep(1000 / speed);
			}
			resetRectangles(j, j + 1);
		}
	}
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}