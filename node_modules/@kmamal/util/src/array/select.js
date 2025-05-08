const { __partitionLeftRight } = require('./sorting/quicksort/partition-left-right')
const { __insertionsort } = require('./sorting/insertionsort')
const { swap } = require('./swap')
const { compare, compareBy } = require('../function/compare')

const swap$$$ = swap.$$$


const __medianOfMedians = (arr, start, end, fnCmp) => {
	const length = end - start
	const numWhole = Math.floor(length / 5)
	const numRest = length % 5

	let readIndex = start
	let writeIndex = start
	for (let i = 0; i < numWhole; i++) {
		const nextReadIndex = readIndex + 5
		__insertionsort(arr, readIndex, readIndex + 1, nextReadIndex, fnCmp)
		const medianIndex = readIndex + 2
		readIndex = nextReadIndex
		swap$$$(arr, writeIndex++, medianIndex)
	}

	if (numRest) {
		if (numRest > 1) { __insertionsort(arr, readIndex, readIndex + 1, end, fnCmp) }
		const medianIndex = readIndex + Math.floor((end - readIndex) / 2)
		swap$$$(arr, writeIndex++, medianIndex)
	}

	return __select(arr, start, writeIndex, Math.floor(numWhole / 2), fnCmp)
}

const __select = (arr, _start, _end, _n, fnCmp) => {
	let start = _start
	let end = _end
	let n = _n

	for (;;) {
		const length = end - start
		if (length <= 5) {
			if (length > 1) { __insertionsort(arr, start, start + 1, end, fnCmp) }
			return start + n
		}

		const pivotIndex = __medianOfMedians(arr, start, end, fnCmp)
		const pivot = arr[pivotIndex]

		const { left, right } = __partitionLeftRight(arr, start, end, pivot, fnCmp)

		if (left > n) {
			end = left
		} else if (right > n) {
			return left
		} else {
			n -= right - start
			start = right
		}
	}
}


const selectWith = (arr, n, fnCmp) => {
	const copy = Array.from(arr)
	const index = __select(copy, 0, arr.length, n, fnCmp)
	return copy[index]
}

const selectWith$$$ = (arr, n, fnCmp) => {
	const index = __select(arr, 0, arr.length, n, fnCmp)
	return arr[index]
}

selectWith.$$$ = selectWith$$$


const selectIndexWith = (arr, n, fnCmp) => {
	const item = selectWith(arr, n, fnCmp)
	return arr.indexOf(item)
}

const selectIndexWith$$$ = (arr, n, fnCmp) => __select(arr, 0, arr.length, n, fnCmp)

selectIndexWith.$$$ = selectIndexWith$$$


const selectBy = (arr, n, fnMap) => {
	const copy = Array.from(arr)
	const index = __select(copy, 0, arr.length, n, compareBy(fnMap))
	return copy[index]
}

const selectBy$$$ = (arr, n, fnMap) => {
	const index = __select(arr, 0, arr.length, n, compareBy(fnMap))
	return arr[index]
}

selectBy.$$$ = selectBy$$$


const selectIndexBy = (arr, n, fnMap) => {
	const item = selectBy(arr, n, fnMap)
	return arr.indexOf(item)
}

const selectIndexBy$$$ = (arr, n, fnMap) => __select(arr, 0, arr.length, n, compareBy(fnMap))

selectIndexBy.$$$ = selectIndexBy$$$


const select = (arr, n) => {
	const copy = Array.from(arr)
	const index = __select(copy, 0, arr.length, n, compare)
	return copy[index]
}

const select$$$ = (arr, n) => {
	const index = __select(arr, 0, arr.length, n, compare)
	return arr[index]
}

select.$$$ = select$$$


const selectIndex = (arr, n) => {
	const item = select(arr, n)
	return arr.indexOf(item)
}

const selectIndex$$$ = (arr, n) => __select(arr, 0, arr.length, n, compare)

selectIndex.$$$ = selectIndex$$$


module.exports = {
	__select,
	selectIndexWith,
	selectIndexBy,
	selectIndex,
	selectWith,
	selectBy,
	select,
}
