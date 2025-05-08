const { __bubbleUp } = require('./bubble-up')
const { compare, compareBy } = require('@kmamal/util/function/compare')

const __add = (arr, start, end, value, fnCmp, indexKey) => {
	arr[end] = value
	__bubbleUp(arr, start, end, fnCmp, indexKey)
}


const addWith = (arr, value, fnCmp, indexKey) => {
	__add(arr, 0, arr.length, value, fnCmp, indexKey)
}

const addBy = (arr, value, fnMap, indexKey) => {
	addWith(arr, value, compareBy(fnMap), indexKey)
}

const add = (arr, value, indexKey) => {
	addWith(arr, value, compare, indexKey)
}


module.exports = {
	__add,
	addWith,
	addBy,
	add,
}
