const { __indexOf, __indexOfSorted } = require('./index-of')
const { eq } = require('../operators')
const { compare } = require('../function/compare')

const __includes = (arr, start, end, x, fnEq) => {
	const index = __indexOf(arr, start, end, x, fnEq)
	return index !== -1
}

const __includesSorted = (arr, start, end, x, fnCmp) => {
	const index = __indexOfSorted(arr, start, end, x, fnCmp)
	return index !== -1
}


const includesWith = (arr, x, fnEq) => __includes(arr, 0, arr.length, x, fnEq)

const includesBy = (arr, x, fnMap) => {
	// HACK: The second argument to eq is always x
	const xValue = fnMap(x)
	return __includes(arr, 0, arr.length, x, (y) => eq(fnMap(y), xValue))
}

const includes = (arr, x) => __includes(arr, 0, arr.length, x, eq)


const includesWithSorted = (arr, x, fnCmp) => __includesSorted(arr, 0, arr.length, x, fnCmp)

const includesBySorted = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return __includesSorted(arr, 0, arr.length, x, (_, y) => compare(xValue, fnMap(y)))
}

const includesSorted = (arr, x) => __includesSorted(arr, 0, arr.length, x, compare)


module.exports = {
	__includes,
	__includesSorted,
	includesWith,
	includesBy,
	includes,
	includesWithSorted,
	includesBySorted,
	includesSorted,
}
