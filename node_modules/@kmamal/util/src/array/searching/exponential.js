const {
	compare,
	compareStrictLess,
	compareStrictGreater,
	strictLess,
	strictGreater,
} = require('../../function/compare')

const __initExponentialSearch = (first, last, sign) => ({
	first,
	last,
	a: first,
	b: null,
	mid: null,
	prev: first,
	step: sign,
	sign,
})

const __expandExponentialSearch = (state, cmp) => {
	const { a, step } = state

	if (cmp * step < 0) {
		if (a === state.first) { return true }

		state.b = a
		state.a = state.prev
		state.mid = Math.floor((state.a + state.b) / 2)
		return true
	}

	const { last } = state
	if (a === last) { return true }

	state.prev = a
	state.step *= 2
	state.a = step > 0 ? Math.min(last, a + step) : Math.max(last, a + step)
	return false
}

const __contractExponentialSearch = (state, cmp) => {
	const { sign } = state
	if (cmp * sign < 0) {
		state.b = state.mid - sign
	} else {
		state.a = state.mid + sign
	}
	const { a, b } = state
	if (Math.sign(b - a) * sign < 0) { return true }
	state.mid = Math.floor((a + b) / 2)
	return false
}

const __exponentialSearch = (arr, start, end, x, fnCmp) => {
	const sign = Math.sign(end - start)
	if (sign === 0) { return start }

	let first
	let last
	let nudge
	if (sign > 0) {
		first = start
		last = end - 1
		nudge = 0
	} else {
		first = start - 1
		last = end
		nudge = 1
	}

	const state = __initExponentialSearch(first, last, sign)

	let cmp
	for (;;) {
		const value = arr[state.a]
		cmp = fnCmp(x, value)
		if (cmp === 0) { return state.a + nudge }
		const done = __expandExponentialSearch(state, cmp)
		if (done) { break }
	}

	if (state.b === null) {
		return (cmp * sign > 0 ? state.a + sign : state.a) + nudge
	}

	for (;;) {
		const value = arr[state.mid]
		cmp = fnCmp(x, value)
		if (cmp === 0) { return state.mid + nudge }
		const done = __contractExponentialSearch(state, cmp)
		if (done) { return state.a + nudge }
	}
}

const exponentialSearchWith = (arr, x, fnCmp) => __exponentialSearch(arr, 0, arr.length, x, fnCmp)
const exponentialSearchFirstWith = (arr, x, fnCmp) => exponentialSearchWith(arr, x, strictLess(fnCmp))
const exponentialSearchLastWith = (arr, x, fnCmp) => exponentialSearchWith(arr, x, strictGreater(fnCmp))

const exponentialSearchWithRight = (arr, x, fnCmp) => __exponentialSearch(arr, arr.length, 0, x, fnCmp)
const exponentialSearchFirstWithRight = (arr, x, fnCmp) => exponentialSearchWithRight(arr, x, strictGreater(fnCmp))
const exponentialSearchLastWithRight = (arr, x, fnCmp) => exponentialSearchWithRight(arr, x, strictLess(fnCmp))

const exponentialSearchBy = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return exponentialSearchWith(arr, x, (_, b) => compare(xValue, fnMap(b)))
}
const exponentialSearchFirstBy = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return exponentialSearchFirstWith(arr, x, (_, b) => compareStrictLess(xValue, fnMap(b)))
}
const exponentialSearchLastBy = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return exponentialSearchLastWith(arr, x, (_, b) => compareStrictGreater(xValue, fnMap(b)))
}

const exponentialSearchByRight = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return exponentialSearchWithRight(arr, x, (_, b) => compare(xValue, fnMap(b)))
}
const exponentialSearchFirstByRight = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return exponentialSearchFirstWithRight(arr, x, (_, b) => compareStrictGreater(xValue, fnMap(b)))
}
const exponentialSearchLastByRight = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return exponentialSearchLastWithRight(arr, x, (_, b) => compareStrictLess(xValue, fnMap(b)))
}

const exponentialSearch = (arr, x) => exponentialSearchWith(arr, x, compare)
const exponentialSearchFirst = (arr, x) => exponentialSearchFirstWith(arr, x, compare)
const exponentialSearchLast = (arr, x) => exponentialSearchLastWith(arr, x, compare)

const exponentialSearchRight = (arr, x) => exponentialSearchWithRight(arr, x, compare)
const exponentialSearchFirstRight = (arr, x) => exponentialSearchFirstWithRight(arr, x, compare)
const exponentialSearchLastRight = (arr, x) => exponentialSearchLastWithRight(arr, x, compare)

module.exports = {
	__initExponentialSearch,
	__expandExponentialSearch,
	__contractExponentialSearch,
	__exponentialSearch,
	exponentialSearchWith,
	exponentialSearchFirstWith,
	exponentialSearchLastWith,
	exponentialSearchWithRight,
	exponentialSearchFirstWithRight,
	exponentialSearchLastWithRight,
	exponentialSearchBy,
	exponentialSearchFirstBy,
	exponentialSearchLastBy,
	exponentialSearchByRight,
	exponentialSearchFirstByRight,
	exponentialSearchLastByRight,
	exponentialSearch,
	exponentialSearchFirst,
	exponentialSearchLast,
	exponentialSearchRight,
	exponentialSearchFirstRight,
	exponentialSearchLastRight,
}
