const { getParent } = require('./tree-helpers')
const { compare, compareBy } = require('@kmamal/util/function/compare')


const __bubbleUp = (arr, start, _index, fnCmp, indexKey) => {
	let index = _index
	const item = arr[index]
	for (;;) {
		const parentIndex = start + getParent(index - start)
		if (parentIndex < start) { break }

		const parent = arr[parentIndex]
		if (fnCmp(parent, item) < 0) { break }

		arr[index] = parent
		if (indexKey) { parent[indexKey] = index }

		index = parentIndex
	}
	arr[index] = item
	if (indexKey) { item[indexKey] = index }
}


const bubbleUpWith = (arr, index, fnCmp, indexKey) => {
	__bubbleUp(arr, 0, index, fnCmp, indexKey)
}

const bubbleUpBy = (arr, index, fnMap, indexKey) => {
	bubbleUpWith(arr, index, compareBy(fnMap), indexKey)
}

const bubbleUp = (arr, index, indexKey) => {
	bubbleUpWith(arr, index, compare, indexKey)
}


module.exports = {
	__bubbleUp,
	bubbleUpWith,
	bubbleUpBy,
	bubbleUp,
}
