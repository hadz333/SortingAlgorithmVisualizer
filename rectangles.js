
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#6395e6";
var rectangleSlider = document.getElementById("rectangleSlider");
var speedSlider = document.getElementById("speedSlider");

var speed = speedSlider.value;

var values = [];
var numRectangles = 10;
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
  		/*let arr = mergeSort(values);
  		values = arr; */
  		mergeSort(values.length);
  		redraw();
	} else if (document.getElementById('quick').checked) {
  		quickSort(0, values.length - 1);
  		redraw();
	} else if (document.getElementById('insertion').checked) {
		insertionSort();
	} else if (document.getElementById('bubble').checked) {
		bubbleSort();
	}
}

// iterative merge sort
function mergeSort(n) 
    { 
          
        // For current size of subarrays to 
        // be merged curr_size varies from  
        // 1 to n/2 
        var curr_size;  
                      
        // For picking starting index of  
        // left subarray to be merged 
        var left_start; 
                          
          
        // Merge subarrays in bottom up  
        // manner. First merge subarrays  
        // of size 1 to create sorted  
        // subarrays of size 2, then merge 
        // subarrays of size 2 to create  
        // sorted subarrays of size 4, and 
        // so on. 
        for (curr_size = 1; curr_size <= n-1;  
                      curr_size = 2*curr_size) 
        { 
              
            // Pick starting point of different 
            // subarrays of current size 
            for (left_start = 0; left_start < n-1; 
                        left_start += 2*curr_size) 
            { 
                // Find ending point of left  
                // subarray. mid+1 is starting  
                // point of right 
                var mid = Math.min(left_start + curr_size - 1, n-1); 
          
                var right_end = Math.min(left_start  
                             + 2*curr_size - 1, n-1); 
          
                // Merge Subarrays arr[left_start...mid] 
                // & arr[mid+1...right_end] 
                merge(left_start, mid, right_end); 
            } 
        } 
    } 
      
    /* Function to merge the two haves arr[l..m] and 
    arr[m+1..r] of array arr[] */
async function merge(l, m, r) 
    {
        //var i, j, k; 
        var n1 = m - l + 1; 
        var n2 = r - m; 
      
        /* create temp arrays */
        L = []; 
        R = []; 
      
        /* Copy data to temp arrays L[] 
        and R[] */
        for (i = 0; i < n1; i++) 
            L[i] = values[l + i]; 
        for (j = 0; j < n2; j++) 
            R[j] = values[m + 1+ j]; 
      
        /* Merge the temp arrays back into 
        arr[l..r]*/
        var i = 0; 
        var j = 0; 
        var k = l; 
        while (i < n1 && j < n2) 
        { 
            if (L[i] <= R[j]) 
            { 
                values[k] = L[i]; 
                i++; 
            } 
            else
            { 
                values[k] = R[j];
                j++; 
            } 
            k++;
        } 
      
        /* Copy the remaining elements of  
        L[], if there are any */
        while (i < n1) 
        { 
            values[k] = L[i]; 
            i++; 
            k++; 
        } 
      
        /* Copy the remaining elements of 
        R[], if there are any */
        while (j < n2) 
        { 
            values[k] = R[j]; 
            j++; 
            k++; 
        } 
    } 

// (recursive)
/*
function mergeSort (unsortedArray) {
  // No need to sort the array if the array only has one element or empty
  if (unsortedArray.length <= 1) {
    return unsortedArray;
  }
  // In order to divide the array in half, we need to figure out the middle
  const middle = Math.floor(unsortedArray.length / 2);

  // This is where we will be dividing the array into left and right
  const left = unsortedArray.slice(0, middle);
  const right = unsortedArray.slice(middle);

  // Using recursion to combine the left and right
  return merge(
    mergeSort(left), mergeSort(right)
  );
}



// Merge the two arrays: left and right
function merge(left, right) {
  let resultArray = [], leftIndex = 0, rightIndex = 0;

  // We will concatenate values into the resultArray in order
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++; // move left array cursor
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++; // move right array cursor
    }
  }

  // We need to concat here because there will be one element remaining
  // from either left OR the right
  return resultArray
          .concat(left.slice(leftIndex))
          .concat(right.slice(rightIndex));
}
*/

// quick sort (recursive)

function quickSort(start, end) {
	if (start < end) {
		var newPivotIndex = partition(start, end);
		resetRectangles(start, end);
		quickSort(start, newPivotIndex - 1);
		quickSort(newPivotIndex + 1, end);
	}
} 


// iterative version of quicksort
//function quickSort(start, end) {
	/*

	var initialEnd = end;
	var left_start = start;
	var left_end = end;
	var right_start = start;
	var right_end = end;
	while (left_start < left_end || right_start < right_end) {
		if (left_start < left_end) {
			var leftPivotIndex = partition(left_start, left_end);
			left_end = leftPivotIndex - 1;
			right_start = leftPivotIndex + 1;
			var rightPivotIndex = partition(right_start, right_end);
		}

		
	}

	*/
	


	/*
	// Create an auxiliary stack 
    stack = []; 

    // initialize top of stack 
    var top = -1; 

    // push initial values of start and height to stack 
    stack[++top] = start; 
    stack[++top] = end; 

    // Keep popping from stack while is not empty 
    while (top >= 0) { 
        // Pop h and l 
        start = stack[top--]; 
        end = stack[top--]; 

        // Set pivot element at its correct position 
        // in sorted array 
        let p = partition(values, start, end); 

        // If there are elements on left side of pivot, 
        // then push left side to stack 
        if (p - 1 > start) { 
            stack[++top] = start; 
            stack[++top] = p - 1; 
        } 

        // If there are elements on right side of pivot, 
        // then push right side to stack 
        if (p + 1 < end) { 
            stack[++top] = p + 1; 
            stack[++top] = end; 
        } 
    } 
    */
//}

function partition(start, end) {
	// get rightmost element as your pivot
	
	var pivot = values[end];
	var pIndex = start;
	for (let i = start; i < end; i++) {
		if (values[i] <= pivot) {
			let temp = values[i];
			values[i] = values[pIndex];
			values[pIndex] = temp;
			pIndex = pIndex + 1;
		}
	}
	let temp = values[end];
	values[end] = values[pIndex];
	values[pIndex] = temp;

	return pIndex;
}

function insertionSort() {
	console.log("insertion");
}

async function bubbleSort() {
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
			await sleep(1000 / speed);
		}
	}
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}