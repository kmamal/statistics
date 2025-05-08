const { __partitionByHoare } = require('./sorting/quicksort/partition-by-hoare')

const __partition = (arr, start, end, fnPred) => {
	const fnCmp = (a, _) => fnPred(a) ? -1 : 1
	return __partitionByHoare(arr, start, end, null, fnCmp)
}

module.exports = { __partition }
