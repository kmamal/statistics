
const __reduce = (arr, start, end, fn, init) => {
	const n = end - start
	if (n <= 0) { return init }

	let acc
	let index

	if (init === undefined) {
		acc = arr[start]
		index = 1
	} else {
		acc = init
		index = 0
	}

	for (;index < n; index++) {
		acc = fn(acc, arr[start + index])
	}

	return acc
}

const __reduceRight = (arr, start, end, fn, init) => {
	const n = end - start
	if (n <= 0) { return init }

	let acc
	let index

	if (init === undefined) {
		acc = arr[end - 1]
		index = end - 2
	} else {
		acc = init
		index = end - 1
	}

	for (; index >= 0; index--) {
		acc = fn(acc, arr[start + index])
	}

	return acc
}


const reduce = (arr, fn, init) => __reduce(arr, 0, arr.length, fn, init)

const reduceRight = (arr, fn, init) => __reduceRight(arr, 0, arr.length, fn, init)


module.exports = {
	__reduce,
	__reduceRight,
	reduce,
	reduceRight,
}
