
const xor = (a, b) => xorTo(new Set(), a, b)

const xorTo = (dst, a, b) => {
	dst.clear()

	for (const x of a) {
		if (b.has(x)) { continue }
		dst.add(x)
	}

	for (const x of b) {
		if (a.has(x)) { continue }
		dst.add(x)
	}

	return dst
}

const xor$$$ = (a, b) => {
	for (const x of b) {
		const existed = a.delete(x)
		if (!existed) { continue }
		a.add(x)
	}
	return a
}

xor.$$$ = xor$$$

module.exports = { xor }
