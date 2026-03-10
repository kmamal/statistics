
const __forEach = (arr, start, end, fn) => {
	for (let i = start; i < end; i++) {
		const item = arr[i]
		fn(item)
	}
}

const forEach = (arr, fn) => {
	__forEach(arr, 0, arr.length, fn)
	return arr
}

module.exports = {
	__forEach,
	forEach,
}
