const Counts = require('@kmamal/counts/map')
const { countBy } = require('@kmamal/util/map/count')

const countByTo = countBy.to


const _entropy = (counts, _total) => {
	let h = 0
	const total = _total ?? Counts.total(counts)
	for (const count of counts.values()) {
		if (count === 0) { continue }
		const p = count / total
		h -= p * Math.log2(p)
	}
	return h
}


const _tmp = new Map()

const entropy = (samples, fnGetLabel) => {
	countByTo(_tmp, samples, fnGetLabel)
	return _entropy(_tmp, samples.length)
}


module.exports = {
	_entropy,
	entropy,
}
