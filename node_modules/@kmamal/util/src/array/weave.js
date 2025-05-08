const { LinkedList } = require('@kmamal/linked-list')
const { __copy } = require('./copy')
const { __merge } = require('./merge')
const { sumBy } = require('./sum')

const _getLength = (x) => x.length


let _state
const _alternate = () => (_state *= -1)

const __weaveTwo = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd) => {
	_state = 1
	__merge(dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, _alternate)
}

const __weave = (dst, dstStart, srcArray) => {
	const num = srcArray.length
	if (num === 0) { return 0 }
	if (num === 1) {
		const a = srcArray[0]
		const { length } = a
		__copy(dst, dstStart, a, 0, length)
		return length
	}
	if (num === 2) {
		const [ a, b ] = srcArray
		const { length: aLength } = a
		const { length: bLength } = b
		__weaveTwo(dst, dstStart, a, 0, aLength, b, 0, bLength)
		return aLength + bLength
	}

	const sources = new LinkedList()
	let maxDepth = 0
	for (let i = num - 1; i >= 0; i--) {
		const src = srcArray[i]
		sources.unshift(src)
		maxDepth = Math.max(maxDepth, src.length)
	}
	if (maxDepth === 0) { return 0 }

	let writeIndex = dstStart
	for (let depth = 0; depth < maxDepth; depth++) {
		const n = sources.size()
		if (n <= 1) {
			const rest = sources._head.value
			const numRemaining = maxDepth - depth
			for (let i = 0; i < numRemaining; i++) {
				dst[writeIndex + i] = rest[depth + i]
			}
			return writeIndex + numRemaining
		}

		let node = sources._head
		let prev = null

		for (let i = 0; i < n; i++) {
			const { value: src } = node
			dst[writeIndex + i] = src[depth]

			const next = node.next
			if (src.length === depth + 1) {
				if (prev === null) {
					sources.shift()
				} else {
					sources._removeAfter(prev)
				}
			} else {
				prev = node
			}
			node = next
		}
		writeIndex += n
	}

	return maxDepth - dstStart
}


const weaveTwo = (a, b) => {
	const aLength = a.length
	const bLength = b.length
	const res = new Array(aLength + bLength)
	__weaveTwo(res, 0, a, 0, aLength, b, 0, bLength)
	return res
}

const weaveTwoTo = (dst, a, b) => {
	const aLength = a.length
	const bLength = b.length
	dst.length = aLength + bLength
	__weaveTwo(dst, 0, a, 0, aLength, b, 0, bLength)
	return dst
}

const weaveTwo$$$ = (_a, b) => {
	const res = _a
	const a = Array.from(a)
	const aLength = a.length
	const bLength = b.length
	res.length = aLength + bLength
	__weaveTwo(res, 0, a, 0, aLength, b, 0, bLength)
	return res
}

weaveTwo.to = weaveTwoTo
weaveTwo.$$$ = weaveTwo$$$


const weave = (arr) => {
	const totalLength = sumBy(arr, _getLength)
	const res = new Array(totalLength)
	__weave(res, 0, arr)
	return res
}

const weaveTo = (dst, arr) => {
	const totalLength = sumBy(arr, _getLength)
	dst.length = totalLength
	__weave(dst, 0, arr)
	return dst
}

const weave$$$ = (_arr) => {
	const res = _arr
	const arr = Array.from(_arr)
	const totalLength = sumBy(arr, _getLength)
	res.length = totalLength
	__weave(res, 0, arr)
	return res
}

weave.to = weaveTo
weave.$$$ = weave$$$


module.exports = {
	__weaveTwo,
	__weave,
	weaveTwo,
	weave,
}
