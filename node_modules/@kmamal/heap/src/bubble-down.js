const { getLeft, getRight } = require('./tree-helpers')
const { compare, compareBy } = require('@kmamal/util/function/compare')


const __bubbleDown = (arr, start, end, _index, fnCmp, indexKey) => {
	let index = _index
	const item = arr[index]
	for (;;) {
		const adjustedIndex = index - start
		const leftChildIndex = start + getLeft(adjustedIndex)
		if (leftChildIndex >= end) { break }
		const leftChild = arr[leftChildIndex]

		const rightChildIndex = start + getRight(adjustedIndex)
		const rightChild = arr[rightChildIndex]

		const isLeft = rightChildIndex >= end || fnCmp(leftChild, rightChild) <= 0
		let minChildIndex
		let minChild
		if (isLeft) {
			minChildIndex = leftChildIndex
			minChild = leftChild
		} else {
			minChildIndex = rightChildIndex
			minChild = rightChild
		}

		if (fnCmp(item, minChild) < 0) { break }

		arr[index] = minChild

		if (indexKey) { minChild[indexKey] = index }

		index = minChildIndex
	}
	arr[index] = item
	if (indexKey) { item[indexKey] = index }
}


const bubbleDownWith = (arr, fnCmp, indexKey) => {
	__bubbleDown(arr, 0, arr.length, fnCmp, indexKey)
}

const bubbleDownBy = (arr, fnMap, indexKey) => {
	bubbleDownWith(arr, compareBy(fnMap), indexKey)
}

const bubbleDown = (arr, indexKey) => {
	bubbleDownWith(arr, compare, indexKey)
}


module.exports = {
	__bubbleDown,
	bubbleDownWith,
	bubbleDownBy,
	bubbleDown,
}
