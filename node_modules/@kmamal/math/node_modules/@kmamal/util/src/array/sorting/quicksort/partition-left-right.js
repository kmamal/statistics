
const _ret = {}

const __partitionLeftRight = (arr, start, end, pivot, fnCmp) => {
	let left = start
	for (let i = start; i < end; i++) {
		if (fnCmp(arr[i], pivot) < 0) {
			const tmp = arr[left]
			arr[left] = arr[i]
			arr[i] = tmp
			left += 1
		}
	}

	let right = left
	for (let i = start; i < end; i++) {
		if (fnCmp(arr[i], pivot) === 0) {
			const tmp = arr[right]
			arr[right] = arr[i]
			arr[i] = tmp
			right += 1
		}
	}

	_ret.left = left
	_ret.right = right
	return _ret
}

module.exports = { __partitionLeftRight }
