const { sort } = require('../array/sort')
const { differenceSorted } = require('../array/difference')
const { empty$$$ } = require('./empty')

const sortTo = sort.to
const sort$$$ = sort.$$$
const differenceSorted$$$ = differenceSorted.$$$

const tmp = []

const __pick = (dst, src, keys) => {
	for (const key of keys) {
		dst[key] = src[key]
	}
}


const pick = (obj, keys) => {
	const res = {}
	__pick(res, obj, keys)
	return res
}

const pickTo = (dst, obj, keys) => {
	empty$$$(dst)
	__pick(dst, obj, keys)
	return dst
}

const pick$$$ = (obj, keys) => {
	const omittedKeys = sort$$$(Object.keys(obj))
	differenceSorted$$$(omittedKeys, sortTo(tmp, keys))
	return omit$$$(obj, omittedKeys)
}

pick.to = pickTo
pick.$$$ = pick$$$


const omit = (obj, keys) => {
	const pickedKeys = sort$$$(Object.keys(obj))
	differenceSorted$$$(pickedKeys, sortTo(tmp, keys))
	return pick(obj, pickedKeys)
}

const omitTo = (dst, obj, keys) => {
	empty$$$(dst)
	const pickedKeys = sort$$$(Object.keys(obj))
	differenceSorted$$$(pickedKeys, sortTo(tmp, keys))
	return pickTo(dst, obj, pickedKeys)
}

const omit$$$ = (obj, keys) => {
	for (const key of keys) {
		delete obj[key]
	}
	return obj
}

omit.to = omitTo
omit.$$$ = omit$$$


module.exports = {
	__pick,
	pick,
	omit,
}
