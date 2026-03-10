const { identity } = require('./identity')

const memoize = (fn, options) => {
	const resolve = options?.resolve ?? identity
	const Cache = options?.constructor ?? Map

	const cache = new Cache()

	const memoized = (...args) => {
		const key = resolve(...args)
		if (cache.has(key)) {
			return cache.get(key)
		}

		const result = fn(...args)

		cache.set(key, result)
		return result
	}

	memoized.cache = cache

	return memoized
}

module.exports = { memoize }
