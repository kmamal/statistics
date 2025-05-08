const { __copy } = require('./copy')

const __swap = (arr, aIndex, bIndex) => {
	const tmp = arr[aIndex]
	arr[aIndex] = arr[bIndex]
	arr[bIndex] = tmp
}


const swap = (arr, aIndex, bIndex) => {
	const res = Array.from(arr)
	if (aIndex !== bIndex) { __swap(res, aIndex, bIndex) }
	return res
}

const swapTo = (dst, arr, aIndex, bIndex) => {
	dst.length = arr.length
	__copy(dst, 0, arr, 0, arr.length)
	if (aIndex !== bIndex) { __swap(dst, aIndex, bIndex) }
	return dst
}

const swap$$$ = (arr, aIndex, bIndex) => {
	if (aIndex !== bIndex) { __swap(arr, aIndex, bIndex) }
	return arr
}

swap.to = swapTo
swap.$$$ = swap$$$


module.exports = {
	__swap,
	swap,
}
