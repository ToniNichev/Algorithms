/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {

	function findMedianIndex(arr) {
		var median = 0;
		var i = 0;
		if(arr.length % 2) {
			var i = (arr.length / 2 + 0.5) - 1;
			median = arr[i];
		}
		else {
			var i = (arr.length / 2);
			median = ((arr[i - 1] + arr[i]) / 2);
		}
		return median;
	}

	function isFirstArrayInTheMiddleOfSecondEvenArray(x, y) {		
		var minX = x[0];
		var maxX = x [1];
		var medianY = Math.floor(y.length / 2);
		var leftMiddleY = y[medianY - 1];
		var rightMiddleY = y[medianY];
		return minX > leftMiddleY && maxX < rightMiddleY;
	}

	function findMedianOfArrayAndValue(arr, val) {
		if(arr.length == 0) {
			return val;
		}
		else if (typeof(val) == 'undefined') {
			return findMedianIndex(arr);
		}
		var median = 0;
		if(arr.length % 2) {
			// odd aray
			// var medianIndex = Math.floor((arr.length / 2));
			// median = arr[medianIndex];
			var arrMedian = findMedianIndex(arr);
			if(arrMedian > val) {
				// the median of merged array should lie on the left of arr  <==
				var i = Math.floor(arr.length / 2);
				var right = arr[i];				
				var left = Math.max( arr[i - 1], val );
				return 	findMedianIndex( [left, right] );						
			}
			else {
				// the median of merged array should lie on the right of arr  ==>
				var i = Math.floor(arr.length / 2);
				var left = arr[i];				
				var right = Math.min( arr[i + 1], val );
				return 	findMedianIndex( [left, right] );					
			}
		}
		else {
			// even aray
			var arrMedian = findMedianIndex(arr);
			if(arrMedian > val) {
				// the median of merged array should lie on the left of arr median  <==
				var i = Math.floor((arr.length / 2) - 1);
				var left = arr[i];
				return Math.max(left, val);
			}
			else {
				// the median lies on the right side ==>
				var i = (arr.length / 2);
				var right = arr[i];
				return Math.min(right, val);
			}

			median = findMedianIndex( [ arr[medianIndex], arr[medianIndex + 1] ]);

		}
		return ( Math.min(median, val) + Math.max(median, val) ) / 2;
	}


	var co = 0;

	function findMedian(X, Y) {

		// check all odd cases	
		if (X.length === 1 && Y.length === 1) {
			return (X[0] + Y[0]) / 2;
		}

		if(X.length <= 1) {
			return findMedianOfArrayAndValue(Y, X[0]);
		}
		else if(Y.length <= 1) {
			return findMedianOfArrayAndValue(X, Y[0]);
		}		
		else if(X.length == 1 && Y.length == 1) {
			var testArray = [ X[0], Y[0] ];
			return findMedianIndex(testArray);
		}
		else if(X.length < 1) {
			var testArray = Y.concat(X);
			return findMedianIndex(testArray);	
		}
		else if( Y.length < 1) {
			var testArray = X.concat(Y);
			return findMedianIndex(testArray);			
		}	
		if( X.length === 2 && Y.length >= 2 && Y.length % 2 === 0) {
			if(isFirstArrayInTheMiddleOfSecondEvenArray(X, Y)) {
				/*
					in example:
					var X = [1, 2];
					var Y = [-1, 3];
				*/
				return (X[0] + X[1]) / 2;
			}
		}
		if( Y.length === 2 && X.length >= 2 && X.length % 2 === 0) {
			if(isFirstArrayInTheMiddleOfSecondEvenArray(Y, X)) {
				/* and the other way */
				return (Y[0] + Y[1]) / 2;
			}
		}	

		var mX = findMedianIndex(X);
		var mY = findMedianIndex(Y);
		
		if(mX == mY) {
			return mX;
		}
			

		var splicePart = Math.floor(Math.min(X.length / 2 - 1, Y.length / 2 - 1));
		splicePart = splicePart < 1 ? 1 : splicePart;

		if (mX < mY) {
			X.splice(0, splicePart);
			Y.splice(Y.length - splicePart);
		} else {
			X.splice(X.length - splicePart);
			Y.splice(0, splicePart);
		}
	

		return findMedian(X, Y);

		co ++;
		if(co > 20) {
			return '';
		}
	}

	return findMedian(nums1, nums2);
}


// Odd cases to test: 

//var X = [2, 3];
//var Y = [1, 5];

//var X = [1, 2];
//var Y = [-1, 3];

//var X = [1, 2];
//var Y = [3, 4];

//var X = [2];
//var Y = [1, 3, 4];

//var X = [2];
//var Y = [];

//var X = [];
//var Y = [1];

//var X = [];
//var Y = [2,3];

//var X = [3];
//var Y = [-2,-1];

//var X = [1];
//var Y = [2,3,4]

//var X = [6];
//var Y = [2, 4, 5];

//var X = [1, 2];
//var Y = [3, 4];

//var X = [1,2,5,6];
//var Y = [3,4];

//var X = [1,2,5];
//var Y = [3,4,6];

var X = [2,6];
var Y = [3,4];


findMedianSortedArrays(X, Y);