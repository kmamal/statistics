
const union = (a, b) => unionTo(new Set(), a, b)

const unionTo = (dst, a, b) => {
	dst.clear()
	for (const x of a) { dst.add(x) }
	for (const x of b) { dst.add(x) }
	return dst
}

const union$$$ = (a, b) => {
	for (const x of b) { a.add(x) }
	return a
}

union.to = unionTo
union.$$$ = union$$$

module.exports = { union }
