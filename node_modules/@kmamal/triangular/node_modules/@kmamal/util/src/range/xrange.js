
const xrange = function * (from, to, step = 1) {
	const remainder = ((to - from) - 1) % step
	for (let i = to - 1 - remainder; i >= from; i -= step) { yield i }
}

module.exports = { xrange }
