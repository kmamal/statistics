const { TaskQueue } = require('@kmamal/async/task-queue')
const { sleep } = require('../../promise/sleep')

const throttle = (fn, time, options = {}) => {
	const {
		leading = false,
		trailing = true,
		reentrant = false,
	} = options

	const queue = new TaskQueue()
	let lastArgs
	let lastResult
	let lastPromise

	let sleeper = null
	let cancelled = false

	const invoke = async () => {
		if (cancelled) { return }
		lastResult = await fn(...lastArgs)
		if (!reentrant) { await lastResult }
	}

	const throttled = (...args) => {
		lastArgs = args

		if (sleeper !== null) { return lastPromise }

		if (queue.size() === 0 && leading) { queue.run(invoke) }

		let promise = queue
			.run(() => (sleeper = sleep(time)))
			.then(() => { sleeper = null })

		if (trailing) { promise = queue.run(invoke) }

		lastPromise = promise.then(() => lastResult)
		return promise
	}

	const cancel = async () => {
		cancelled = true
		sleeper?.cancel()
		await queue.empty()
		cancelled = false
	}

	throttled.cancel = async () => {
		await cancel()
	}

	throttled.flush = async () => {
		await cancel()
		return lastResult
	}

	return throttled
}

module.exports = { throttle }
