
const after = (fn, n) => {
	let count = 1
	return (...args) => {
		if (count <= n) {
			count += 1
			return undefined
		}
		return fn(...args)
	}
}

module.exports = { after }
