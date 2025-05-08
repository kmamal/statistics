const { mapValues } = require('./map-values')

const _cache = new Map()

const _cloneWithDirtyCache = (x) => {
	if (typeof x === 'function') { throw new Error("can't clone functions") }

	if (x === null || typeof x !== 'object') { return x }

	const cached = _cache.get(x)
	if (cached) { return cached }

	let res
	transform: {
		if (Array.isArray(x)) {
			res = Array.from(x, _cloneWithDirtyCache)
			break transform
		}

		if (x instanceof Map) {
			res = new Map()
			for (const entry of x.entries()) {
				res.set(_cloneWithDirtyCache(entry[0]), _cloneWithDirtyCache(entry[1]))
			}
			break transform
		}

		if (x instanceof Set) {
			res = new Set()
			for (const value of x.values()) {
				res.add(_cloneWithDirtyCache(value))
			}
			break transform
		}

		res = mapValues(x, _cloneWithDirtyCache)
	}

	_cache.set(x, res)
	return res
}

const clone = (x) => {
	const res = _cloneWithDirtyCache(x)
	_cache.clear()
	return res
}

module.exports = { clone }
