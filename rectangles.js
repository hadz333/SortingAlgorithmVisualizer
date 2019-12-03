
var c = document.getElementById("myCanvas");
var rectangleSlider = document.getElementById("rectangleSlider");
var speedSlider = document.getElementById("speedSlider");


generateRectangles(5);

function updateSlider(newValue) {
	generateRectangles(newValue);
}



function generateRectangles(numRectangles) {
	var values = [];
	for (i = 0; i < numRectangles; i++) {
		// populate the array with values between 20 and 200 for rectangle size
		values[i] = Math.floor(Math.random() * 180) + 20
	}

	var y = 0;
	var x = 0;
	var rectWidth = 15;
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	for (i = 0; i < values.length; i++) {
		ctx.rect(x, y, rectWidth, values[i]);
		x += rectWidth;
	}

	ctx.stroke();
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

function bubbleSort() {
	console.log("bubble");
}
