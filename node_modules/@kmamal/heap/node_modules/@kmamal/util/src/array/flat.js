
const __flat = (dst, dstStart, src, srcStart, srcEnd, _maxDepth) => {
	const maxDepth = _maxDepth + 1
	let writeIndex = dstStart

	const stack = [ { arr: src, length: srcEnd - srcStart, index: 0 } ]
	for (;;) {
		const depth = stack.length

		const top = stack[depth - 1]
		if (top.index === top.length) {
			if (depth === 1) { break }
			stack.pop()
			continue
		}

		const item = top.arr[top.index++]
		if (Array.isArray(item) && depth < maxDepth) {
			stack.push({ arr: item, length: item.length, index: 0 })
			continue
		}

		dst[writeIndex++] = item
	}

	return writeIndex - dstStart
}


const flat = (arr, _maxDepth = 1) => {
	const res = []
	__flat(res, 0, arr, 0, arr.length, _maxDepth)
	return res
}

const flatTo = (dst, arr, _maxDepth = 1) => {
	const n = __flat(dst, 0, arr, 0, arr.length, _maxDepth)
	dst.length = n
	return dst
}

flat.to = flatTo


module.exports = {
	__flat,
	flat,
}
