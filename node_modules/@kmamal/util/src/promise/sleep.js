const { Future } = require('@kmamal/async/future')

const sleep = (time) => {
	const future = new Future()

	let timeout = null

	const promise = future.promise()

	promise.reset = (t) => {
		if (timeout !== null) { clearTimeout(timeout) }
		timeout = setTimeout(() => { future.resolve() }, t)
	}

	promise.cancel = () => {
		if (timeout === null) { return }
		clearTimeout(timeout)
		timeout = null
	}

	promise.reset(time)

	return promise
}

module.exports = { sleep }
