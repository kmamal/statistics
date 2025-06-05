const Counts = require('@kmamal/counts/map')
const { count, countBy } = require('@kmamal/util/map/count')

const countTo = count.to
const countByTo = countBy.to


const entropyFromCounts = (counts, _total) => {
	let h = 0
	const total = _total ?? Counts.total(counts)
	for (const num of counts.values()) {
		if (num === 0) { continue }
		const p = num / total
		h -= p * Math.log2(p)
	}
	return h
}


const _tmp = new Map()

const entropyBy = (arr, fnMap) => {
	countByTo(_tmp, arr, fnMap)
	return entropyFromCounts(_tmp, arr.length)
}

const entropy = (arr) => {
	countTo(_tmp, arr)
	return entropyFromCounts(_tmp, arr.length)
}


module.exports = {
	entropyFromCounts,
	entropyBy,
	entropy,
}
