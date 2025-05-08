
const __chunk = (dst, dstStart, src, srcStart, srcEnd, chunkSize, chunkNum) => {
	let readIndex = srcStart

	for (let i = 0; i < chunkNum - 1; i++) {
		const chunk = new Array(chunkSize)
		for (let j = 0; j < chunkSize; j++) {
			chunk[j] = src[readIndex + j]
		}
		readIndex += chunkSize
		dst[dstStart + i] = chunk
	}

	{
		const available = Math.max(0, srcEnd - readIndex)
		const lastChunkSize = Math.min(available, chunkSize)
		const chunk = new Array(lastChunkSize)
		for (let j = 0; j < lastChunkSize; j++) {
			chunk[j] = src[readIndex + j]
		}
		dst[dstStart + chunkNum - 1] = chunk
	}
}

const chunk = (arr, n) => {
	const { length } = arr
	if (length === 0 || n <= 0) { return [] }

	const numChunks = Math.ceil(length / n)
	const res = new Array(numChunks)
	__chunk(res, 0, arr, 0, length, n, numChunks)
	return res
}

const chunkTo = (dst, arr, n) => {
	const { length } = arr
	if (length === 0 || n <= 0) {
		dst.length = 0
		return dst
	}

	const numChunks = Math.ceil(length / n)
	dst.length = numChunks
	__chunk(dst, 0, arr, 0, length, n, numChunks)
	return dst
}

const chunk$$$ = (arr, n) => {
	const { length } = arr
	if (length === 0) { return arr }
	if (n <= 0) {
		arr.length = 0
		return arr
	}

	const numChunks = Math.ceil(length / n)
	__chunk(arr, 0, arr, 0, length, n, numChunks)
	arr.length = numChunks
	return arr
}

chunk.to = chunkTo
chunk.$$$ = chunk$$$

module.exports = {
	__chunk,
	chunk,
}
