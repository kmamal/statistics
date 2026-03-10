
const atIndex = (length, index) => index === undefined ? 0
	: index < 0 ? length + index
	: index

const at = (arr, index) => arr[atIndex(arr.length, index)]

module.exports = {
	atIndex,
	at,
}
