const { map } = require('../array/map')
const { empty$$$ } = require('../object/empty')

const PATTERN = /\[(?<key1>[^.\]+])\]|\.?(?<key2>[^[.]+)/ug

const getKey = ({ groups }) => groups.key1 || groups.key2

const map$$$ = map.$$$


const _stepsCache = new Map()

const __makeSteps = (path) => {
	const cached = _stepsCache.get(path)
	if (cached) { return cached }
	const matches = [ ...path.matchAll(PATTERN) ]
	const res = map$$$(matches, getKey)
	_stepsCache.set(path, res)
	return res
}

const __get = (obj, steps) => {
	let value = obj
	for (let i = 0; i < steps.length; i++) {
		value = value[steps[i]]
	}
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
	const steps = __makeSteps(path)
	return __get(obj, steps)
}


const set = (obj, path, value) => {
	const steps = __makeSteps(path)
	const res = {}
	__set({}, obj, steps, value)
	return res
}

const setTo = (dst, obj, path, value) => {
	const steps = __makeSteps(path)
	empty$$$(dst)
	Object.assign(dst, obj)
	__set(dst, steps, value)
	return dst
}

const set$$$ = (obj, path, value) => {
	const steps = __makeSteps(path)
	__set(obj, steps, value)
	return obj
}

set.to = setTo
set.$$$ = set$$$


const _getterCache = new Map()

const getter = (path) => {
	const cached = _getterCache.get(path)
	if (cached) { return cached }

	const steps = __makeSteps(path)
	const res = (obj) => __get(obj, steps)

	_getterCache.set(path, res)
	return res
}


const _setterCache = new Map()

const setter = (path) => {
	const cached = _setterCache.get(path)
	if (cached) { return cached }

	const steps = __makeSteps(path)
	const res = (obj, value) => __set(obj, steps, value)

	_setterCache.set(path, res)
	return res
}


module.exports = {
	__makeSteps,
	__get,
	__set,
	get,
	set,
	getter,
	setter,
}
