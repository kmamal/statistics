const { swap } = require('../../swap')

const swap$$$ = swap.$$$

const _ret = {}

const __partitionLeftRight = (arr, start, end, pivot, fnCmp) => {
	let left = start
	for (let i = start; i < end; i++) {
		if (fnCmp(arr[i], pivot) < 0) {
			swap$$$(arr, left, i)
			left += 1
		}
	}

	let right = left
	for (let i = start; i < end; i++) {
		if (fnCmp(arr[i], pivot) === 0) {
			swap$$$(arr, right, i)
			right += 1
		}
	}

	_ret.left = left
	_ret.right = right
	return _ret
}

module.exports = { __partitionLeftRight }
