const { startIndex } = require('./start-index')
const { endIndex } = require('./end-index')
const { __copy } = require('./copy')
const { clamp } = require('../number/clamp')

const slice = (arr, start, end) => arr.slice(start, end)

const sliceTo = (dst, arr, _start, _end) => {
	const { length } = arr
	const start = clamp(startIndex(length, _start), 0, length)
	const end = clamp(endIndex(length, _end), start, length)

	dst.length = end - start
	__copy(dst, 0, arr, start, end)
	return dst
}

const slice$$$ = (arr, _start, _end) => {
	const { length } = arr
	const start = clamp(startIndex(length, _start), 0, length)
	const end = clamp(endIndex(length, _end), start, length)

	__copy(arr, 0, arr, start, end)
	arr.length = end - start
	return arr
}

slice.to = sliceTo
slice.$$$ = slice$$$

module.exports = { slice }
