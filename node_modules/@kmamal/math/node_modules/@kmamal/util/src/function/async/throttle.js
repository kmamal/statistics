
const throttle = (fn, time, options) => {
	const leading = options && options.leading
	const trailing = !options || options.trailing
	let timeout = null
	let lastArgs = null
	let lastResult

	const invoke = () => {
		if (lastArgs && trailing) {
			lastResult = fn(...lastArgs)
		}
		lastArgs = null
	}

	const throtled = (...args) => {
		lastArgs = args

		if (!timeout) {
			if (leading) { invoke() }
			setTimeout(invoke, time)
		}

		return lastResult
	}

	throtled.cancel = () => {
		if (!timeout) { return }
		clearTimeout(timeout)
		timeout = null
	}

	throtled.flush = () => {
		invoke()
		return lastResult
	}

	return throtled
}

module.exports = { throttle }
