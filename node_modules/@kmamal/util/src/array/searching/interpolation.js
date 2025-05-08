const { interpolate } = require('../../number/interpolate')
const {
	strictLess,
	strictGreater,
} = require('../../function/compare')

const { sub } = require('../../operators/arithmetic/sub')

const __interpolationSearch = (arr, start, end, x, fnDist) => {
	let low = start
	let high = end
	let lowValue = arr[low]
	let highValue = arr[high - 1]

	let lowDist = fnDist(x, lowValue)
	if (lowDist <= 0) { return low }

	let highDist = -fnDist(x, highValue)
	if (highDist === 0) { return high - 1 }
	if (highDist < 0) { return high }

	while (low < high) {
		const range = highDist + lowDist
		if (range === 0) { return low }

		const ratio = lowDist / range
		const mid = Math.floor(interpolate(low, high, ratio))
		const midValue = arr[mid]
		const dist = fnDist(x, midValue)
		if (dist === 0) { return mid }
		if (dist < 0) {
			high = mid
			highValue = midValue
			highDist = -dist
		} else {
			low = mid + 1
			lowValue = midValue
			lowDist = dist
		}
	}
	return low
}

const interpolationSearchWith = (arr, x, fnDist) => __interpolationSearch(arr, 0, arr.length, x, fnDist)
const interpolationSearchFirstWith = (arr, x, fnDist) => interpolationSearchWith(arr, x, strictLess(fnDist))
const interpolationSearchLastWith = (arr, x, fnDist) => interpolationSearchWith(arr, x, strictGreater(fnDist))

const interpolationSearchBy = (arr, x, fnMap) => {
	// HACK: The first argument to dist is always x
	const xValue = fnMap(x)
	return interpolationSearchWith(arr, x, (a, b) => sub(xValue, fnMap(b)))
}
const interpolationSearchFirstBy = (arr, x, fnMap) => {
	// HACK: The first argument to dist is always x
	const xValue = fnMap(x)
	return interpolationSearchFirstWith(arr, x, (a, b) => sub(xValue, fnMap(b)))
}
const interpolationSearchLastBy = (arr, x, fnMap) => {
	// HACK: The first argument to dist is always x
	const xValue = fnMap(x)
	return interpolationSearchLastWith(arr, x, (a, b) => sub(xValue, fnMap(b)))
}

const interpolationSearch = (arr, x) => interpolationSearchWith(arr, x, sub)
const interpolationSearchFirst = (arr, x) => interpolationSearchFirstWith(arr, x, sub)
const interpolationSearchLast = (arr, x) => interpolationSearchLastWith(arr, x, sub)

module.exports = {
	__interpolationSearch,
	interpolationSearchWith,
	interpolationSearchFirstWith,
	interpolationSearchLastWith,
	interpolationSearchBy,
	interpolationSearchFirstBy,
	interpolationSearchLastBy,
	interpolationSearch,
	interpolationSearchFirst,
	interpolationSearchLast,
}
