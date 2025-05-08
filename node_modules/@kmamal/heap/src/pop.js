const { __remove } = require('./remove')
const { compare, compareBy } = require('@kmamal/util/function/compare')


const __pop = (arr, start, end, fnCmp, indexKey) => {
	__remove(arr, start, end, 0, fnCmp, indexKey)
}


const popWith = (arr, fnCmp, indexKey) => {
	__pop(arr, 0, arr.length, fnCmp, indexKey)
	return arr.pop()
}

const popBy = (arr, fnMap, indexKey) => popWith(arr, compareBy(fnMap), indexKey)

const pop = (arr, indexKey) => popWith(arr, compare, indexKey)


module.exports = {
	__pop,
	popWith,
	popBy,
	pop,
}
