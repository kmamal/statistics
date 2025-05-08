const { map } = require('../array/map')

const PATTERN = /\[(?<key1>[^.\]+])\]|\.?(?<key2>[^[.]+)/ug

const getKey = ({ groups }) => groups.key1 || groups.key2

const map$$$ = map.$$$


const _stepsCache = new Map()

const _makeSteps = (path) => {
	const cached = _stepsCache.get(path)
	if (cached) { return cached }
	const matches = [ ...path.matchAll(PATTERN) ]
	const res = map$$$(matches, getKey)
	_stepsCache.set(path, res)
	return res
}

const __get = (obj, steps) => {
	let value = obj
	for (const step of steps) { value = value[step] }
	return value
}

const __set = (obj, steps, value) => {
	const { length } = steps
	const lastIndex = length - 1
	const lastStep = steps[lastIndex]

	let curr = obj
	for (let i = 0; i < lastIndex; i++) {
		const step = steps[i]
		curr = curr[step]
	}

	const lastValue = curr[lastStep]
	curr[lastStep] = value
	return lastValue
}


const get = (obj, path) => {
	const steps = _makeSteps(path)
	return __get(obj, steps)
}


const set = (obj, path, value) => {
	const steps = _makeSteps(path)
	const res = {}
	__set({}, obj, steps, value)
	return res
}

const setTo = (dst, obj, path, value) => {
	const steps = _makeSteps(path)
	for (const key of Object.keys(dst)) { delete dst[key] }
	Object.assign(dst, obj)
	__set(dst, steps, value)
	return dst
}

const set$$$ = (obj, path, value) => {
	const steps = _makeSteps(path)
	__set(obj, steps, value)
	return obj
}

set.to = setTo
set.$$$ = set$$$


const _getterCache = new Map()

const getter = (path) => {
	const cached = _getterCache.get(path)
	if (cached) { return cached }

	const steps = _makeSteps(path)
	const res = (obj) => __get(obj, steps)

	_getterCache.set(path, res)
	return res
}


module.exports = {
	__get,
	__set,
	get,
	set,
	getter,
}
