
const __selectPivotMedianOfThree = (arr, start, end, fnCmp) => {
	const mid = Math.floor((start + end) / 2)
	const last = end - 1
	if (fnCmp(arr[mid], arr[start]) < 0) {
		const tmp = arr[mid]
		arr[mid] = arr[start]
		arr[start] = tmp
	}
	if (fnCmp(arr[last], arr[start]) < 0) {
		const tmp = arr[last]
		arr[last] = arr[start]
		arr[start] = tmp
	}
	if (fnCmp(arr[mid], arr[last]) < 0) {
		const tmp = arr[mid]
		arr[mid] = arr[last]
		arr[last] = tmp
	}
	return arr[last]
}

module.exports = { __selectPivotMedianOfThree }
