const { map } = require('../../array/map')

const map$$$ = map.$$$


const _pascalCase = (str) => {
	const { length } = str
	const res = new Array(length)
	let writeIndex = 0

	let expectLeading = true
	let startsWord = true
	for (let i = 0; i < length; i++) {
		const char = str[i]
		if (char === '-' || char === '_') {
			startsWord = true
			if (!expectLeading) { continue }
			res[writeIndex++] = '_'
		} else {
			expectLeading = false
			if (startsWord) {
				res[writeIndex++] = char.toUpperCase()
				startsWord = false
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

const pascalCase = (str) => {
	const parts = str.split(' ')
	map$$$(parts, _pascalCase)
	return parts.join(' ')
}

const isPascalCase = (str) => str === pascalCase(str)

module.exports = {
	pascalCase,
	isPascalCase,
}
