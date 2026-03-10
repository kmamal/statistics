
const __reverse = (dst, dstStart, src, srcStart, srcEnd) => {
	const offset = (srcEnd - srcStart) - 1
	let writeIndexStart = dstStart
	let writeIndexEnd = dstStart + offset
	let readIndexStart = srcStart
	let readIndexEnd = srcStart + offset
	while (readIndexStart < readIndexEnd) {
		const front = src[readIndexStart++]
		const back = src[readIndexEnd--]
		dst[writeIndexStart++] = back
		dst[writeIndexEnd--] = front
	}

	if (dst !== src && readIndexStart === readIndexEnd) {
		dst[writeIndexStart] = src[readIndexStart]
	}
}


const reverse = (arr) => {
	const { length } = arr
	const res = new Array(length)
	__reverse(res, 0, arr, 0, length)
	return res
}

const reverseTo = (dst, arr) => {
	const { length } = arr
	dst.length = length
	__reverse(dst, 0, arr, 0, length)
	return dst
}

const reverse$$$ = (arr) => {
	__reverse(arr, 0, arr, 0, arr.length)
	return arr
}

reverse.to = reverseTo
reverse.$$$ = reverse$$$


module.exports = {
	__reverse,
	reverse,
}
