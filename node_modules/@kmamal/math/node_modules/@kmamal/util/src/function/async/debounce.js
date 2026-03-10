
const debounce = (fn, time, options) => {
	let leading = false
	let trailing = true
	if (options) {
		if (options.leading !== undefined) { leading = options.leading }
		if (options.trailing !== undefined) { trailing = options.trailing }
	}

	let timeout = null
	let lastArgs
	let lastResult

	const invoke = () => {
		lastResult = fn(...lastArgs)
	}

	const cancel = () => {
		clearTimeout(timeout)
		timeout = null
	}

	const debounced = (...args) => {
		lastArgs = args

		if (timeout) {
			cancel()
		} else if (leading) {
			invoke()
		}

		timeout = setTimeout(() => {
			timeout = null
			if (!trailing) { return }
			invoke()
		}, time)
		return lastResult
	}

	debounced.cancel = () => {
		if (!timeout) { return }
		cancel()
	}

	debounced.flush = () => {
		if (timeout) {
			cancel()
			if (trailing) { invoke() }
		}
		return lastResult
	}

	return debounced
}

module.exports = { debounce }
