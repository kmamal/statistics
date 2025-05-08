const { __remove } = require('./remove')
const { compare, compareBy } = require('@kmamal/util/function/compare')


const __pop = (arr, start, end, fnCmp) => {
	__remove(arr, start, end, 0, fnCmp)
}


const popWith = (arr, fnCmp) => {
	__pop(arr, 0, arr.length, fnCmp)
	return arr.pop()
}

const popBy = (arr, fnMap) => popWith(arr, compareBy(fnMap))

const pop = (arr) => popWith(arr, compare)


module.exports = {
	__pop,
	popWith,
	popBy,
	pop,
}
