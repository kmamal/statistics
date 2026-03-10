const { empty$$$ } = require('./empty')

const __mapKeys = (dst, src, fnMap) => {
	for (const key of Object.keys(src)) {
		dst[fnMap(key)] = src[key]
	}
}


const mapKeys = (obj, fnMap) => {
	const res = {}
	__mapKeys(res, obj, fnMap)
	return res
}

const mapKeysTo = (dst, obj, fnMap) => {
	empty$$$(dst)
	__mapKeys(dst, obj, fnMap)
	return dst
}

mapKeys.to = mapKeysTo


module.exports = {
	__mapKeys,
	mapKeys,
}
