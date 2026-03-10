
const __partitionByLomuto = (arr, start, end, pivot, fnCmp) => {
	let partition = start
	for (let i = start; i < end; i++) {
		if (fnCmp(arr[i], pivot) < 0) {
			const tmp = arr[partition]
			arr[partition] = arr[i]
			arr[i] = tmp
			partition += 1
		}
	}

	const tmp = arr[partition]
	arr[partition] = pivot
	arr[end - 1] = tmp

	return partition
}

module.exports = { __partitionByLomuto }
