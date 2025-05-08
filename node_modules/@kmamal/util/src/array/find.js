const { __linearSearch, __linearSearchRight } = require('./searching/linear')

const findIndex = (arr, fnPred) => __linearSearch(arr, 0, arr.length, null, fnPred)

const findIndexRight = (arr, fnPred) => __linearSearchRight(arr, 0, arr.length, null, fnPred)

const find = (arr, fnPred) => {
	const index = __linearSearch(arr, 0, arr.length, null, fnPred)
	return index === -1 ? undefined : arr[index]
}

const findRight = (arr, fnPred) => {
	const index = __linearSearchRight(arr, 0, arr.length, null, fnPred)
	return index === -1 ? undefined : arr[index]
}

module.exports = {
	// findIndex,
	findIndexRight,
	// find,
	findRight,
}
