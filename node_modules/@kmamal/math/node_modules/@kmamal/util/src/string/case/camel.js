const { map } = require('../../array/map')

const _camelCase = (str) => {
	const { length } = str
	const res = new Array(length)
	let writeIndex = 0

	let expectLeading = true
	let startsWord = true
	let isFirst = true
	for (let i = 0; i < length; i++) {
		const char = str[i]
		if (char === '-' || char === '_') {
			startsWord = true
			if (!expectLeading) { continue }
			res[writeIndex++] = '_'
		} else {
			expectLeading = false
			if (startsWord) {
				res[writeIndex++] = isFirst
					? char.toLowerCase()
					: char.toUpperCase()
				startsWord = false
				isFirst = false
			} else {
				res[writeIndex++] = char
			}
		}
	}

	if (!expectLeading) {
		for (let i = length - 1; i >= 0; i--) {
			const char = str[i]
			if (char !== '-' && char !== '_')	{ break }
			res[writeIndex++] = '_'
		}
	}

	return res.join('')
}

const camelCase = (str) => {
	const parts = str.split(' ')
	map.$$$(parts, _camelCase)
	return parts.join(' ')
}

const isCamelCase = (str) => str === camelCase(str)

module.exports = {
	camelCase,
	isCamelCase,
}
