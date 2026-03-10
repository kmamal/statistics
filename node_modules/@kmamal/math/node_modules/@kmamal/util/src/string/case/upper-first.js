
const upperFirst = (str) => `${str[0].toUpperCase()}${str.slice(1)}`

const isUpperFirst = (str) => str === upperFirst(str)

module.exports = {
	upperFirst,
	isUpperFirst,
}
