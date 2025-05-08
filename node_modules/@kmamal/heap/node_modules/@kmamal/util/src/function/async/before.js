
const before = (fn, n) => {
	let count = 1
	let lastResult
	return (...args) => {
		if (count < n) {
			count += 1
			lastResult = fn(...args)
		}
		return lastResult
	}
}

module.exports = { before }
