
const __map = (dst, dstStart, src, srcStart, srcEnd, fn) => {
	let writeIndex = dstStart
	let readIndex = srcStart
	while (readIndex < srcEnd) {
		dst[writeIndex++] = fn(src[readIndex++])
	}
}

const map$$$ = (arr, fn) => {
	__map(arr, 0, arr, 0, arr.length, fn)
	return arr
}

const mapTo = (dst, arr, fn) => {
	const { length } = arr
	__map(dst, 0, arr, 0, length, fn)
	dst.length = length
	return dst
}

const map = (arr, fn) => {
	const { length } = arr
	const res = new Array(length)
	__map(res, 0, arr, 0, arr.length, fn)
	return res
}

map.$$$ = map$$$
map.to = mapTo

module.exports = {
	__map,
	map,
}
