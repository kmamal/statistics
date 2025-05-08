
const unfold = (fn, n, init) => {
	const res = new Array(n)
	let value = init
	res[0] = init
	for (let i = 1; i < n; i++) {
		value = fn(value)
		res[i] = value
	}
	return res
}

module.exports = { unfold }
