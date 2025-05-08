const { swap } = require('../../swap')

const swap$$$ = swap.$$$

const __selectPivotMedianOfThree = (arr, start, end, fnCmp) => {
	const mid = Math.floor((start + end) / 2)
	const last = end - 1
	if (fnCmp(arr[mid], arr[start]) < 0) {
		swap$$$(arr, mid, start)
	}
	if (fnCmp(arr[last], arr[start]) < 0) {
		swap$$$(arr, last, start)
	}
	if (fnCmp(arr[mid], arr[last]) < 0) {
		swap$$$(arr, mid, last)
	}
	return arr[last]
}

module.exports = { __selectPivotMedianOfThree }
