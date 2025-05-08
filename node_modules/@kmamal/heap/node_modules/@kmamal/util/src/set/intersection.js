
const intersection = (a, b) => intersectionTo(new Set(), a, b)

const intersectionTo = (dst, a, b) => {
	let small
	let large
	if (a.size < b.size) {
		small = a
		large = b
	} else {
		small = b
		large = a
	}

	dst.clear()
	for (const x of small) {
		if (!large.has(x)) { continue }
		dst.add(x)
	}
	return dst
}

const intersection$$$ = (a, b) => {
	for (const x of a) {
		if (b.has(x)) { continue }
		a.delete(x)
	}
	return a
}

intersection.to = intersectionTo
intersection.$$$ = intersection$$$

module.exports = { intersection }
