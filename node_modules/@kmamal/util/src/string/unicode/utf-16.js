
const isSurrogateHigh = (str, index) => {
	const wchar = str.charCodeAt(index)
	return 0xd800 <= wchar && wchar < 0xdc00
}

const isSurrogateLow = (str, index) => {
	const wchar = str.charCodeAt(index)
	return 0xdc00 <= wchar && wchar < 0xe000
}

module.exports = {
	isSurrogateHigh,
	isSurrogateLow,
}
