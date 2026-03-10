
const makeSyncMiddleware = (handlers) => (...args) => {
	let result

	let handled
	const next = () => { handled = false }

	for (const func of handlers) {
		handled = true
		result = func(next, ...args)
		if (handled) { break }
	}

	return handled ? result : undefined
}

const makeAsyncMiddleware = (handlers) => async (...args) => {
	let result

	let handled
	const next = () => { handled = false }

	for (const func of handlers) {
		handled = true
		result = await func(next, ...args)
		if (handled) { break }
	}

	return handled ? result : undefined
}

const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor

const makeMiddleware = (handlers) => {
	let isAsync = false
	for (const handler of handlers) {
		if (handler instanceof AsyncFunction) {
			isAsync = true
			break
		}
	}

	return isAsync
		? makeAsyncMiddleware(handlers)
		: makeSyncMiddleware(handlers)
}

module.exports = { makeMiddleware }
