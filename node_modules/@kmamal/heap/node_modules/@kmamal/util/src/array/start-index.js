
const startIndex = (length, index) => index === undefined ? 0
	: index < 0 ? Math.max(0, length + index)
	: Math.min(length, index)

module.exports = { startIndex }
