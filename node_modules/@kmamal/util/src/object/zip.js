const { empty$$$ } = require('./empty')

const __zip = (dst, keys, values) => {
	const { length } = keys
	for (let i = 0; i < length; i++) {
		const key = keys[i]
		const value = values[i]
		dst[key] = value
	}
}


const zip = (keys, values) => {
	const res = {}
	__zip(res, keys, values)
	return res
}

const zipTo = (dst, keys, values) => {
	empty$$$(dst)
	__zip(dst, keys, values)
	return dst
}

zip.to = zipTo


module.exports = {
	__zip,
	zip,
}
