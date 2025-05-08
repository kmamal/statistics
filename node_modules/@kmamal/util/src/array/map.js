
const __map = (dst, dstStart, src, srcStart, srcEnd, fn) => {
	const n = srcEnd - srcStart
	for (let i = 0; i < n; i++) {
		dst[dstStart + i] = fn(src[srcStart + i])
	}
}

const __mapIndexed = (dst, dstStart, src, srcStart, srcEnd, fn) => {
	const n = srcEnd - srcStart
	for (let i = 0; i < n; i++) {
		const index = srcStart + i
		dst[dstStart + i] = fn(src[index], index)
	}
}


const map$$$ = (arr, fn) => {
	__map(arr, 0, arr, 0, arr.length, fn)
	return arr
}

const mapTo = (dst, arr, fn) => {
	const { length } = arr
	dst.length = length
	__map(dst, 0, arr, 0, length, fn)
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


const mapIndexed$$$ = (arr, fn) => {
	__mapIndexed(arr, 0, arr, 0, arr.length, fn)
	return arr
}

const mapIndexedTo = (dst, arr, fn) => {
	const { length } = arr
	dst.length = length
	__mapIndexed(dst, 0, arr, 0, length, fn)
	return dst
}

const mapIndexed = (arr, fn) => {
	const { length } = arr
	const res = new Array(length)
	__mapIndexed(res, 0, arr, 0, arr.length, fn)
	return res
}

mapIndexed.$$$ = mapIndexed$$$
mapIndexed.to = mapIndexedTo


module.exports = {
	__map,
	__mapIndexed,
	map,
	mapIndexed,
}
