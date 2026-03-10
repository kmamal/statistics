
const __every = (arr, start, end, fnPred) => {
	for (let i = start; i < end; i++) {
		if (!fnPred(arr[i])) { return false }
	}
	return true
}

const every = (arr, fnPred) => __every(arr, 0, arr.length, fnPred)

module.exports = {
	__every,
	every,
}
