const { empty$$$ } = require('./empty')

const __copy = (dst, src) => {
	const keys = Object.keys(src)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		dst[key] = src[key]
	}
}

const copyTo = (dst, src) => {
	empty$$$(dst)
	__copy(dst, src)
	return dst
}

module.exports = {
	__copy,
	copyTo,
}
