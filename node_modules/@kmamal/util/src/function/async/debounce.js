const { TaskQueue } = require('@kmamal/async/task-queue')
const { sleep } = require('../../promise/sleep')

const debounce = (fn, time, options = {}) => {
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

	const debounced = (...args) => {
		lastArgs = args

		if (sleeper !== null) {
			sleeper.reset(time)
			return lastPromise
		}

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

	debounced.cancel = async () => {
		await cancel()
	}

	debounced.flush = async () => {
		await cancel()
		return lastResult
	}

	return debounced
}

module.exports = { debounce }
