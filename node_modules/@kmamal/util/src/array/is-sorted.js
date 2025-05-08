const { compare, compareBy } = require('../function/compare')

const __isSorted = (arr, start, end, fnCmp) => {
	let prev = arr[start]
	for (let i = start; i < end; i++) {
		const curr = arr[i]
		if (fnCmp(prev, curr) > 0) { return false }
		prev = curr
	}
	return true
}


const isSortedWith = (arr, fnCmp) => __isSorted(arr, 0, arr.length, fnCmp)

const isSortedBy = (arr, fnMap) => __isSorted(arr, 0, arr.length, compareBy(fnMap))

const isSorted = (arr) => __isSorted(arr, 0, arr.length, compare)


module.exports = {
	__isSorted,
	isSortedWith,
	isSortedBy,
	isSorted,
}
