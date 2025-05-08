
const __scan = (dst, dstStart, src, srcStart, srcEnd, fn, init) => {
	const n = srcEnd - srcStart
	if (n <= 0) { return }

	const first = src[srcStart]

	let acc
	let index
	if (init === undefined) {
		acc = first
		dst[dstStart] = first
		index = 1
	} else {
		acc = init
		index = 0
	}

	for (; index < n; index++) {
		acc = fn(acc, src[srcStart + index])
		dst[dstStart + index] = acc
	}
}

const __scanRight = (dst, dstStart, src, srcStart, srcEnd, fn, init) => {
	const n = srcEnd - srcStart
	if (n <= 0) { return }

	const last = src[srcEnd - 1]
	const dstEnd = dstStart + n

	let acc
	let index
	if (init === undefined) {
		acc = last
		dst[dstEnd - 1] = last
		index = srcEnd - 2
	} else {
		acc = init
		index = srcEnd - 1
	}

	for (; index >= 0; index--) {
		acc = fn(acc, src[srcStart + index])
		dst[dstStart + index] = acc
	}
}


const scan = (arr, fn, init) => {
	const { length } = arr
	const res = new Array(length)
	__scan(res, 0, arr, 0, length, fn, init)
	return res
}

const scanTo = (dst, arr, fn, init) => {
	const { length } = arr
	dst.length = length
	__scan(dst, 0, arr, 0, length, fn, init)
	return dst
}

const scan$$$ = (arr, fn, init) => {
	__scan(arr, 0, arr, 0, arr.length, fn, init)
	return arr
}

scan.to = scanTo
scan.$$$ = scan$$$


const scanRight = (arr, fn, init) => {
	const { length } = arr
	const res = new Array(length)
	__scanRight(res, 0, arr, 0, length, fn, init)
	return res
}

const scanRightTo = (dst, arr, fn, init) => {
	const { length } = arr
	dst.length = length
	__scanRight(dst, 0, arr, 0, length, fn, init)
	return dst
}

const scanRight$$$ = (arr, fn, init) => {
	__scanRight(arr, 0, arr, 0, arr.length, fn, init)
	return arr
}

scanRight.to = scanRightTo
scanRight.$$$ = scanRight$$$


module.exports = {
	__scan,
	__scanRight,
	scan,
	scanRight,
}
