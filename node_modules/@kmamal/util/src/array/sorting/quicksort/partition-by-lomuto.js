const { swap } = require('../../swap')

const swap$$$ = swap.$$$

const __partitionByLomuto = (arr, start, end, pivot, fnCmp) => {
	let partition = start
	for (let i = start; i < end; i++) {
		if (fnCmp(arr[i], pivot) < 0) {
			swap$$$(arr, partition, i)
			partition += 1
		}
	}

	const tmp = arr[partition]
	arr[partition] = pivot
	arr[end - 1] = tmp

	return partition
}

module.exports = { __partitionByLomuto }
