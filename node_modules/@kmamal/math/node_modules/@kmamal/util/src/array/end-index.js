
const endIndex = (length, index) => index === undefined ? length
	: index < 0 ? Math.max(0, length + index)
	: Math.min(length, index)

module.exports = { endIndex }
