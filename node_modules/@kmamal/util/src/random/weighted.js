const { defaultRng } = require('./default-rng')
const { __binarySearch } = require('../array/searching/binary')
const { prefixSums, prefixSumsBy } = require('../array/prefix-sums')
const { compareBy, strictLess } = require('../function/compare')
const { sub } = require('../operators/arithmetic/sub')


const __chooseFromPrefixSums = (rng, arr, start, end, fnCmp) => {
	const length = end - start
	if (length === 0) { return -1 }

	const total = arr[end - 1]
	const r = rng.uniform() * total
	return __binarySearch(arr, start, end, r, strictLess(fnCmp))
}

const chooseFromPrefixSumsWith = (arr, fnCmp) => __chooseFromPrefixSums(defaultRng, arr, 0, arr.length, fnCmp)

const chooseFromPrefixSumsBy = (arr, fnMap) => __chooseFromPrefixSums(defaultRng, arr, 0, arr.length, compareBy(fnMap))

const chooseFromPrefixSums = (arr) => __chooseFromPrefixSums(defaultRng, arr, 0, arr.length, sub)


const chooseFromWeights = (arr) => {
	const sums = prefixSums(arr)
	return __chooseFromPrefixSums(defaultRng, sums, 0, arr.length, sub)
}


const chooseWeightedBy = (arr, fnMap) => {
	const sums = prefixSumsBy(arr, fnMap)
	const index = __chooseFromPrefixSums(defaultRng, sums, 0, sums.length, sub)
	return arr[index]
}


module.exports = {
	__chooseFromPrefixSums,
	chooseFromPrefixSumsWith,
	chooseFromPrefixSumsBy,
	chooseFromPrefixSums,
	chooseFromWeights,
	chooseWeightedBy,
}
