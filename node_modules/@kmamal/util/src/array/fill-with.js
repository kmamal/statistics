const { startIndex, endIndex } = require('./relative-indexing')
const { __copy } = require('./copy')

const __fillWith = (arr, start, end, fn) => {
	for (let i = start; i < end; i++) {
		arr[i] = fn(i)
	}
}

const fillWith = (arr, fn, _start, _end) => {
	const { length } = arr
	const start = startIndex(length, _start)
	const end = Math.max(start, endIndex(length, _end))

	const res = new Array(Math.max(length, end))
	__copy(res, 0, arr, 0, start)
	__fillWith(res, start, end, fn)
	__copy(res, end, arr, end, length)
	return res
}

const fillWithTo = (dst, arr, fn, _start, _end) => {
	const { length } = arr
	const start = startIndex(length, _start)
	const end = Math.max(start, endIndex(length, _end))

	dst.length = Math.max(length, end)
	__copy(dst, 0, arr, 0, start)
	__fillWith(dst, start, end, fn)
	__copy(dst, end, arr, end, length)
	return dst
}

const fillWith$$$ = (arr, fn, _start, _end) => {
	const { length } = arr
	const start = startIndex(length, _start)
	const end = Math.max(start, endIndex(length, _end))

	arr.length = Math.max(length, end)
	__fillWith(arr, start, end, fn)
	return arr
}

fillWith.to = fillWithTo
fillWith.$$$ = fillWith$$$

module.exports = {
	__fillWith,
	fillWith,
}
