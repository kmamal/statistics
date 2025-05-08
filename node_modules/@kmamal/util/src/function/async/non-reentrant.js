
const kNonReentrant = Symbol("non-reentrant")

const nonReentrant = (fn, shouldThrow = false) => {
	let running = false

	return async (...args) => {
		if (running) {
			if (shouldThrow) { throw new Error('not reentrant') }
			return kNonReentrant
		}
		running = true
		const result = await fn(...args)
		running = false
		return result
	}
}

module.exports = {
	SYM: { kNonReentrant },
	nonReentrant,
}
