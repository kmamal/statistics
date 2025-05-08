const { sleep } = require('./sleep')

const timeout = (time, info) => {
	const sleepPromise = sleep(time)

	const promise = sleepPromise.then(() => {
		throw Object.assign(new Error("timeout"), info)
	})

	promise.cancel = sleepPromise.cancel

	return promise
}

module.exports = { timeout }
