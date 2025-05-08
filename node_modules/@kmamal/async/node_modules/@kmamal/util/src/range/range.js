
const range = function * (from, to, step = 1) {
	for (let i = from; i < to; i += step) { yield i }
}

module.exports = { range }
