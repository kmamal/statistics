const { swap } = require('../../swap')

const swap$$$ = swap.$$$

const __partitionByHoare = (arr, start, end, pivot, fnCmp) => {
	let startIndex = start
	let endIndex = end - 1
	for (;;) {
		for (; startIndex < end; startIndex++) {
			const item = arr[startIndex]
			if (fnCmp(item, pivot) > 0) { break }
		}

		for (; endIndex > start; endIndex--) {
			const item = arr[endIndex]
			if (fnCmp(item, pivot) < 0) { break }
		}

		if (startIndex >= endIndex) { break }

		swap$$$(arr, startIndex, endIndex)
		startIndex += 1
		endIndex -= 1
	}

	return startIndex
}

module.exports = { __partitionByHoare }
