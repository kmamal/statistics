const { __linearSearch, __linearSearchRight } = require('./searching/linear')
const { __binarySearch } = require('./searching/binary')
const { eq } = require('../operators')
const { compare, strictLess, strictGreater } = require('../function/compare')

const LINEAR_SEARCH_CUTOFF = 5000

const __indexOf = (arr, start, end, x, fnEq) => __linearSearch(arr, start, end, x, fnEq)

const __indexOfRight = (arr, start, end, x, fnEq) => __linearSearchRight(arr, start, end, x, fnEq)

const __indexOfSorted = (arr, start, end, x, fnCmp) => {
	const length = end - start
	if (length <= 0) { return -1 }
	if (length <= LINEAR_SEARCH_CUTOFF) {
		return __indexOf(arr, start, end, x, (a, b) => fnCmp(b, a) === 0)
	}
	const fnCmpLt = strictLess(fnCmp)
	const index = __binarySearch(arr, start, end, x, fnCmpLt)
	const found = index !== end && fnCmpLt(x, arr[index]) === 0
	return found ? index : -1
}

const __indexOfSortedRight = (arr, start, end, x, fnCmp) => {
	const length = end - start
	if (length <= 0) { return -1 }
	if (length <= LINEAR_SEARCH_CUTOFF) {
		return __indexOfRight(arr, start, end, x, (a, b) => fnCmp(b, a) === 0)
	}
	const fnCmpGt = strictGreater(fnCmp)
	const index = __binarySearch(arr, start, end, x, fnCmpGt) - 1
	const found = index !== start - 1 && fnCmpGt(x, arr[index]) === 0
	return found ? index : -1
}


const indexOfWith = (arr, x, fnEq) => __indexOf(arr, 0, arr.length, x, fnEq)

const indexOfWithRight = (arr, x, fnEq) => __indexOfRight(arr, 0, arr.length, x, fnEq)

const indexOfBy = (arr, x, fnMap) => {
	// HACK: The second argument to eq is always x
	const xValue = fnMap(x)
	return __indexOf(arr, 0, arr.length, x, (y) => eq(fnMap(y), xValue))
}
const indexOfByRight = (arr, x, fnMap) => {
	// HACK: The second argument to eq is always x
	const xValue = fnMap(x)
	return __indexOfRight(arr, 0, arr.length, x, (y) => eq(fnMap(y), xValue))
}

const indexOf = (arr, x) => __indexOf(arr, 0, arr.length, x, eq)

const indexOfRight = (arr, x) => __indexOfRight(arr, 0, arr.length, x, eq)


const indexOfWithSorted = (arr, x, fnCmp) => __indexOfSorted(arr, 0, arr.length, x, fnCmp)

const indexOfWithSortedRight = (arr, x, fnCmp) => __indexOfSortedRight(arr, 0, arr.length, x, fnCmp)

const indexOfBySorted = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return __indexOfSorted(arr, 0, arr.length, x, (_, y) => compare(xValue, fnMap(y)))
}
const indexOfBySortedRight = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return __indexOfSortedRight(arr, 0, arr.length, x, (_, y) => compare(xValue, fnMap(y)))
}

const indexOfSorted = (arr, x) => __indexOfSorted(arr, 0, arr.length, x, compare)

const indexOfSortedRight = (arr, x) => __indexOfSortedRight(arr, 0, arr.length, x, compare)


module.exports = {
	__indexOf,
	__indexOfRight,
	__indexOfSorted,
	__indexOfSortedRight,
	indexOfWith,
	indexOfWithRight,
	indexOfBy,
	indexOfByRight,
	// indexOf,
	indexOfRight,
	indexOfWithSorted,
	indexOfWithSortedRight,
	indexOfBySorted,
	indexOfBySortedRight,
	// indexOfSorted,
	indexOfSortedRight,
}
