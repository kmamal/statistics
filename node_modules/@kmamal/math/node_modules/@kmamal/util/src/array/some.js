
const __some = (arr, start, end, fnPred) => {
	for (let i = start; i < end; i++) {
		if (fnPred(arr[i])) { return true }
	}
	return false
}

const some = (arr, fnPred) => __some(arr, 0, arr.length, fnPred)

module.exports = {
	__some,
	some,
}
