
const __forEach = (arr, start, end, fn) => {
	for (let i = start; i < end; i++) {
		fn(arr[i])
	}
}

const __forEachIndexed = (arr, start, end, fn) => {
	for (let i = start; i < end; i++) {
		fn(arr[i], i)
	}
}


const forEach = (arr, fn) => {
	__forEach(arr, 0, arr.length, fn)
	return arr
}

const forEachIndexed = (arr, fn) => {
	__forEachIndexed(arr, 0, arr.length, fn)
	return arr
}


const forEachTwo = (a, b, fn) => {
	for (let i = 0; i < a.length; i++) {
		fn(a[i], b[i])
	}
	return a
}

const forEachThree = (a, b, c, fn) => {
	for (let i = 0; i < a.length; i++) {
		fn(a[i], b[i], c[i])
	}
	return a
}


module.exports = {
	__forEach,
	__forEachIndexed,
	forEach,
	forEachIndexed,
	forEachTwo,
	forEachThree,
}
