
const __linearSearch = (arr, start, end, x, fnEq) => {
	for (let i = start; i < end; i++) {
		const item = arr[i]
		if (fnEq(item, x)) { return i }
	}
	return -1
}

const __linearSearchRight = (arr, start, end, x, fnEq) => {
	for (let i = end - 1; i >= start; i--) {
		const item = arr[i]
		if (fnEq(item, x)) { return i }
	}
	return -1
}

module.exports = {
	__linearSearch,
	__linearSearchRight,
}
