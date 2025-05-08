const { empty$$$ } = require('@kmamal/util/object/empty')

const kTotal = Symbol("total")


const add = (counts, key, n) => {
	counts[kTotal] = total(counts) + n
	const m = counts[key] ?? 0
	counts.set(key, m + n)
	return m
}

const inc = (counts, key) => add(counts, key, 1)
const dec = (counts, key) => add(counts, key, -1)

const total = (counts) => {
	if (counts[kTotal] === undefined) {
		let sum = 0
		for (const key in counts) { sum += counts[key] }
		counts[kTotal] = sum
	}
	return counts[kTotal]
}

const mostFrequent = (counts) => {
	let maxKey
	let maxCount = -Infinity
	for (const key in counts) {
		const count = counts[key]
		if (count > maxCount) {
			maxCount = count
			maxKey = key
		}
	}
	return maxKey
}

const reset = empty$$$


module.exports = {
	SYM: { kTotal },
	add,
	inc,
	dec,
	total,
	mostFrequent,
	reset,
}
