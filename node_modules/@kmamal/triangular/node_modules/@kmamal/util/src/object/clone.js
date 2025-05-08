const { mapValues } = require('./map-values')

// TODO: use structuredClone when it becomes available

const _clone = (x, cache, clone) => {
	if (typeof x === 'function') { throw new Error("can't clone functions") }

	if (typeof x !== 'object') { return x }

	const cached = cache.get(x)
	if (cached) { return cached }

	let res
	transform: {
		if (Array.isArray(x)) {
			res = Array.from(x, clone)
			break transform
		}

		if (x instanceof Map) {
			res = new Map()
			for (const entry of x.entries()) {
				res.set(clone(entry[0]), clone(entry[1]))
			}
			break transform
		}

		if (x instanceof Set) {
			res = new Set()
			for (const value of x.value()) {
				res.add(clone(value))
			}
			break transform
		}

		res = mapValues(x, clone)
	}

	cache.set(x, res)
	return res
}

const clone = (x) => {
	const cache = new Map()
	const bound = (y) => _clone(y, cache, bound)
	return bound(x)
}

module.exports = { clone }
