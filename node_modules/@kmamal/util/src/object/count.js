const { empty$$$ } = require('./empty')
const { identity } = require('../function/identity')

const __count = (dst, arr, start, end, fnMap) => {
	for (let i = start; i < end; i++) {
		const item = arr[i]
		const key = fnMap(item)
		const n = dst[key] ?? 0
		dst[key] = n + 1
	}
}

const countBy = (arr, fnMap) => {
	const counts = Object.create(null)
	__count(counts, arr, 0, arr.length, fnMap)
	return counts
}

const countByTo = (dst, arr, fnMap) => {
	empty$$$(dst)
	__count(dst, arr, 0, arr.length, fnMap)
	return dst
}

countBy.to = countByTo

const count = (arr) => {
	const counts = Object.create(null)
	__count(counts, arr, 0, arr.length, identity)
	return counts
}

const countTo = (dst, arr) => {
	empty$$$(dst)
	__count(dst, arr, 0, arr.length, identity)
	return dst
}

count.to = countTo

module.exports = {
	__count,
	countBy,
	count,
}
