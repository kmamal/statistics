
const _stack = [ null ]

const __flat = (dst, dstStart, src, srcStart, srcEnd, _maxDepth) => {
	const maxDepth = _maxDepth + 1
	let writeIndex = dstStart

	_stack[0] = { arr: src, length: srcEnd - srcStart, index: 0 }

	for (;;) {
		const depth = _stack.length

		const top = _stack[depth - 1]
		if (top.index === top.length) {
			if (depth === 1) { break }
			_stack.pop()
			continue
		}

		const item = top.arr[top.index++]
		if (Array.isArray(item) && depth < maxDepth) {
			_stack.push({ arr: item, length: item.length, index: 0 })
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

const flat$$$ = (_arr, _maxDepth = 1) => {
	const res = _arr
	const arr = Array.from(_arr)
	const n = __flat(res, 0, arr, 0, arr.length, _maxDepth)
	res.length = n
	return res
}

flat.to = flatTo
flat.$$$ = flat$$$


module.exports = {
	__flat,
	flat,
}
