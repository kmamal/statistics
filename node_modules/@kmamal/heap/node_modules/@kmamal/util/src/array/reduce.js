
const __reduce = (arr, start, end, fn, init) => {
	let acc = init
	let index = start

	if (acc === undefined) {
		acc = arr[index++]
	}

	while (index < end) {
		acc = fn(acc, arr[index++])
	}

	return acc
}

const __reduceRight = (arr, start, end, fn, init) => {
	let acc = init
	let index = end - 1

	if (acc === undefined) {
		acc = arr[index--]
	}

	while (index >= start) {
		acc = fn(acc, arr[index--])
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
