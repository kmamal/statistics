
const __scan = (dst, dstStart, src, srcStart, srcEnd, fn, init) => {
	if (srcStart === srcEnd) { return }

	let writeIndex = dstStart
	let readIndex = srcStart

	let acc = init

	const first = src[readIndex++]
	if (acc === undefined) {
		acc = first
	} else {
		acc = fn(acc, first)
	}
	dst[writeIndex++] = acc

	while (readIndex < srcEnd) {
		acc = fn(acc, src[readIndex++])
		dst[writeIndex++] = acc
	}
}

const __scanRight = (dst, dstStart, src, srcStart, srcEnd, fn, init) => {
	if (srcStart === srcEnd) { return }

	const length = srcEnd - srcStart
	const dstEnd = dstStart + length
	let writeIndex = dstEnd - 1
	let readIndex = srcEnd - 1

	let acc = init

	const last = src[readIndex--]
	if (acc === undefined) {
		acc = last
	} else {
		acc = fn(acc, last)
	}
	dst[writeIndex--] = acc

	while (readIndex >= srcStart) {
		acc = fn(acc, src[readIndex--])
		dst[writeIndex--] = acc
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
