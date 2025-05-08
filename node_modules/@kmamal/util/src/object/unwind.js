const { clone } = require('./clone')
const { __makeSteps, __get, __set } = require('./accessors')

const unwind = (obj, path) => {
	const steps = __makeSteps(path)
	const arr = __get(obj, steps)
	const { length } = arr
	const res = new Array(length)

	__set(obj, steps, null)
	for (let i = 0; i < length; i++) {
		const cloned = clone(obj)
		__set(cloned, steps, arr[i])
		res[i] = cloned
	}
	__set(obj, steps, arr)

	return res
}

module.exports = { unwind }
