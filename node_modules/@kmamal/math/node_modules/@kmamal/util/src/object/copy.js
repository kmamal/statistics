const { clone } = require('./clone')
const { empty$$$ } = require('./empty')

const __copy = (dst, src) => {
	for (const key of Object.keys(src)) {
		dst[key] = src[key]
	}
}

const __copyDeep = (dst, src) => {
	for (const key of Object.keys(src)) {
		dst[key] = clone(src[key])
	}
}


const copy = (dst, src) => {
	empty$$$(dst)
	__copy(dst, src)
	return dst
}

const copyDeep = (dst, src) => {
	empty$$$(dst)
	__copyDeep(dst, src)
	return dst
}


module.exports = {
	__copy,
	__copyDeep,
	copy,
	copyDeep,
}
