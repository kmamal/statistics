
const time = (fn) => {
	const start = Date.now()
	fn()
	return Date.now() - start
}

module.exports = { time }
