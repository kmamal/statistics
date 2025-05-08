const { __copy, __copyRight } = require('./copy')

const __move = (arr, fromIndex, toIndex) => {
	if (fromIndex === toIndex) { return }

	const item = arr[fromIndex]
	if (fromIndex < toIndex) {
		__copy(arr, fromIndex, arr, fromIndex + 1, toIndex + 1)
	} else {
		__copyRight(arr, toIndex + 1, arr, toIndex, fromIndex)
	}
	arr[toIndex] = item
}


const move = (arr, fromIndex, toIndex) => {
	const res = Array.from(arr)
	__move(res, fromIndex, toIndex)
	return res
}

const moveTo = (dst, arr, fromIndex, toIndex) => {
	if (fromIndex === toIndex) {
		__copy(dst, 0, arr, 0, arr.length)
		return dst
	}

	dst.length = arr.length
	__copy(dst, 0, arr, 0, arr.length)
	__move(dst, fromIndex, toIndex)
	return dst
}

const move$$$ = (arr, fromIndex, toIndex) => {
	__move(arr, fromIndex, toIndex)
	return arr
}

move.to = moveTo
move.$$$ = move$$$


module.exports = {
	__move,
	move,
}
