
const add = (a, b, n) => {
	const res = (a + b) % n
	return res >= 0 ? res : res + n
}

const sub = (a, b, n) => add(a, -b, n)

const inc = (a, n) => (a + 1) % n

const dec = (a, n) => add(a, -1, n)

module.exports = {
	add,
	sub,
	inc,
	dec,
}
