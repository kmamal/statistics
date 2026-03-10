
const difference = (a, b) => differenceTo(new Set(), a, b)

const differenceTo = (dst, a, b) => {
	dst.clear()
	for (const x of a) {
		if (b.has(x)) { continue }
		dst.add(x)
	}
	return dst
}

const difference$$$ = (a, b) => {
	for (const x of a) {
		if (!b.has(x)) { continue }
		a.delete(x)
	}
	return a
}

difference.to = differenceTo
difference.$$$ = difference$$$

module.exports = { difference }
