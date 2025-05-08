const { identity } = require('../function/identity')

const __count = (dst, arr, start, end, fnMap) => {
	for (let i = start; i < end; i++) {
		const item = arr[i]
		const key = fnMap(item)
		dst.set(key, (dst.get(key) ?? 0) + 1)
	}
}

const countBy = (arr, fnMap) => {
	const counts = new Map()
	__count(counts, arr, 0, arr.length, fnMap)
	return counts
}

const countByTo = (dst, arr, fnMap) => {
	dst.clear()
	__count(dst, arr, 0, arr.length, fnMap)
	return dst
}

countBy.to = countByTo

const count = (arr) => {
	const counts = new Map()
	__count(counts, arr, 0, arr.length, identity)
	return counts
}

const countTo = (dst, arr) => {
	dst.clear()
	__count(dst, arr, 0, arr.length, identity)
	return dst
}

count.to = countTo

module.exports = {
	__count,
	countBy,
	count,
}
