
const delay = (fn, time) => (...args) => {
	const timeout = setTimeout(() => fn(...args), time)
	return () => { clearTimeout(timeout) }
}

module.exports = { delay }
