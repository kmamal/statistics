const { LinkedList } = require('@kmamal/linked-list')
const { __copy } = require('./copy')
const { __merge } = require('./merge')
const { sumBy } = require('./sum')

let _state
const _alternate = () => (_state *= -1)

const __weaveTwo = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd) => {
	_state = 1
	__merge(dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, _alternate)
}

const __weave = (dst, dstStart, srcArray) => {
	const num = srcArray.length
	if (num === 0) { return }
	if (num === 1) {
		const a = srcArray[0]
		__copy(dst, dstStart, a, 0, a.length)
		return
	}
	if (num === 2) {
		const a = srcArray[0]
		const b = srcArray[1]
		__weaveTwo(dst, dstStart, a, 0, a.length, b, 0, b.length)
		return
	}

	const sources = new LinkedList()
	for (let i = num - 1; i >= 0; i--) {
		sources.unshift(srcArray[i])
	}

	let writeIndex = dstStart

	let depth = 0
	let node
	let value
	while (sources.size() > 1) {
		node = sources._head
		for (;;) {
			if (!node) { return }
			value = node.value
			if (value.length > depth) { break }
			sources.shift(node)
			node = sources._head
		}

		loop:
		for (;;) {
			dst[writeIndex++] = value[depth]

			for (;;) {
				const next = node.next
				if (!next) { break loop }
				value = next.value
				if (value.length === depth) {
					sources._removeAfter(node)
					continue
				}
				node = next
				break
			}
		}
		depth++
	}

	const rest = sources._head.value
	while (depth < rest.length) {
		dst[writeIndex++] = rest[depth++]
	}
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

weaveTwo.to = weaveTwoTo


const weave = (arr) => {
	const totalLength = sumBy(arr, (x) => x.length)
	const res = new Array(totalLength)
	__weave(res, 0, arr)
	return res
}

const weaveTo = (dst, arr) => {
	const totalLength = sumBy(arr, (x) => x.length)
	dst.length = totalLength
	__weave(dst, 0, arr)
	return dst
}

weave.to = weaveTo


module.exports = {
	__weaveTwo,
	__weave,
	weaveTwo,
	weave,
}
