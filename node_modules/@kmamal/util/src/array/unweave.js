
const __unweave = (dst, dstStart, src, srcStart, srcEnd, num) => {
	const n = srcEnd - srcStart
	const remaining = n % num
	const fullLoops = (n - remaining) / num

	for (let i = 0; i < remaining; i++) {
		dst[dstStart + i] = new Array(fullLoops + 1)
	}
	for (let i = remaining; i < num; i++) {
		dst[dstStart + i] = new Array(fullLoops)
	}

	for (let depth = 0; depth < fullLoops; depth++) {
		for (let i = 0; i < num; i++) {
			dst[dstStart + i][depth] = src[srcStart + depth * num + i]
		}
	}
	for (let i = 0; i < remaining; i++) {
		dst[dstStart + i][fullLoops] = src[srcStart + fullLoops * num + i]
	}
}


const unweave = (arr, num) => {
	if (num <= 0) { return [] }

	const res = new Array(num)
	__unweave(res, 0, arr, 0, arr.length, num)
	return res
}

const unweaveTo = (dst, arr, num) => {
	if (num <= 0) {
		dst.length = 0
		return dst
	}

	dst.length = num
	__unweave(dst, 0, arr, 0, arr.length, num)
	return dst
}

const unweave$$$ = (arr, num) => {
	if (num <= 0) {
		arr.length = 0
		return arr
	}

	__unweave(arr, 0, arr, 0, arr.length, num)
	arr.length = num
	return arr
}

unweave.to = unweaveTo
unweave.$$$ = unweave$$$


module.exports = {
	__unweave,
	unweave,
}
