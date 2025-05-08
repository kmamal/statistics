const { map } = require('../../array/map')
const { upperFirst } = require('./upper-first')

const capitalize = (str) => {
	const words = str.split(' ')
	map.$$$(words, upperFirst)
	return words.join(' ')
}

const isCapitalized = (str) => str === capitalize(str)

module.exports = {
	capitalize,
	isCapitalized,
}
