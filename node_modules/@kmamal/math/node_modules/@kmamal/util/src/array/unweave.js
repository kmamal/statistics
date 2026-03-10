
const __unweave = (dst, dstStart, src, srcStart, srcEnd, num) => {
	const length = srcEnd - srcStart

	const div = Math.floor(length / num)
	const mod = length % num

	let writeIndex = dstStart
	let readIndex = srcStart
	{
		const divp1 = div + 1
		while (writeIndex < mod) {
			const chunk = new Array(divp1)
			chunk[0] = src[readIndex++]
			dst[writeIndex++] = chunk
		}

		if (div === 0) {
			while (writeIndex < num) { dst[writeIndex++] = [] }
			return
		}

		while (writeIndex < num) {
			const chunk = new Array(div)
			chunk[0] = src[readIndex++]
			dst[writeIndex++] = chunk
		}
	}

	let depth = 1
	while (depth < div) {
		for (let i = 0; i < num; i++) {
			dst[i][depth] = src[readIndex++]
		}
		depth++
	}

	for (let i = 0; i < mod; i++) {
		dst[i][depth] = src[readIndex++]
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
