
const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor
const _isAsync = (x) => x instanceof AsyncFunction

const makeSyncMiddleware = (handlers) => (...args) => {
	let result

	let handled
	const next = () => { handled = false }

	for (let i = 0; i < handlers.length; i++) {
		handled = true
		result = handlers[i](next, ...args)
		if (handled) { break }
	}

	return handled ? result : undefined
}

const makeAsyncMiddleware = (handlers) => async (...args) => {
	let result

	let handled
	const next = () => { handled = false }

	for (let i = 0; i < handlers.length; i++) {
		handled = true
		result = await handlers[i](next, ...args)
		if (handled) { break }
	}

	return handled ? result : undefined
}

const makeMiddleware = (handlers) => {
	const isAsync = handlers.some(_isAsync)
	return isAsync
		? makeAsyncMiddleware(handlers)
		: makeSyncMiddleware(handlers)
}

module.exports = { makeMiddleware }
