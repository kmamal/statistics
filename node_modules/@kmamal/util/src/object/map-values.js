const { empty$$$ } = require('./empty')

const __mapValues = (dst, src, fnMap) => {
	const keys = Object.keys(src)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		dst[key] = fnMap(src[key])
	}
}


const mapValues = (obj, fnMap) => {
	const res = {}
	__mapValues(res, obj, fnMap)
	return res
}

const mapValuesTo = (dst, obj, fnMap) => {
	empty$$$(dst)
	__mapValues(dst, obj, fnMap)
	return dst
}

const mapValues$$$ = (obj, fnMap) => {
	__mapValues(obj, obj, fnMap)
	return obj
}

mapValues.to = mapValuesTo
mapValues.$$$ = mapValues$$$


module.exports = {
	__mapValues,
	mapValues,
}
