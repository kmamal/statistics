const { sleep } = require('../../promise/sleep')

const delay = (fn, time) => (...args) => {
	const sleepPromise = sleep(time)

	const promise = sleepPromise.then(() => fn(...args))

	promise.cancel = sleepPromise.cancel
	promise.reset = sleepPromise.reset

	return promise
}

module.exports = { delay }
