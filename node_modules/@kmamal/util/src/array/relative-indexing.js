
const atIndex = (length, index) => index < 0 ? length + index : index

const startIndex = (length, index) => index === undefined ? 0
	: index < 0 ? Math.max(0, length + index)
	: Math.min(length, index)

const endIndex = (length, index) => index === undefined ? length
	: index < 0 ? Math.max(0, length + index)
	: Math.min(length, index)

module.exports = {
	atIndex,
	startIndex,
	endIndex,
}
