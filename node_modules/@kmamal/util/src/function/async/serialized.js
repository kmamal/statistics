
const serialized = (fn) => {
	let promise = Promise.resolve()

	return async (...args) => await (promise = promise.then(() => fn(...args)))
}

module.exports = { serialized }
