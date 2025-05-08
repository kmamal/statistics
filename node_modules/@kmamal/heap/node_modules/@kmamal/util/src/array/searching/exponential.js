const { compare } = require('../../function/compare')

const __initExponentialSearch = (first, last, step) => ({
	first,
	last,
	a: first,
	b: null,
	prev: first,
	step,
})

const __expandExponentialSearch = (state, cmp) => {
	const { a, step } = state

	if (cmp * step < 0) {
		if (a === state.first) { return true }

		state.b = a
		state.a = state.prev
		state.mid = Math.floor((state.b + state.a) / 2)
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
	if (cmp < 0) {
		state.b = state.mid
	} else {
		state.a = state.mid + 1
	}
	const { a, b } = state
	if (b <= a) { return true }
	state.mid = Math.floor((b + a) / 2)
	return false
}

const __exponentialSearch = (arr, start, end, x, fnCmp) => {
	const sign = Math.sign(end - start)
	if (sign === 0) { return start }

	const state = __initExponentialSearch(start, end - sign, sign)

	let cmp
	for (;;) {
		const value = arr[state.a]
		cmp = fnCmp(x, value)
		if (cmp === 0) { return state.a }
		const done = __expandExponentialSearch(state, cmp)
		if (done) { break }
	}

	if (state.b === null) {
		return sign > 0
			? cmp > 0 ? state.a + 1 : state.a
			: cmp < 0 ? state.a - 1 : state.a
	}

	if (sign < 0) {
		const tmp = state.a
		state.a = state.b
		state.b = tmp
	}

	for (;;) {
		const value = arr[state.mid]
		cmp = fnCmp(x, value)
		if (cmp === 0) { return state.mid }
		const done = __contractExponentialSearch(state, cmp)
		if (done) { return state.a }
	}
}

const __exponentialSearchFirst = (arr, start, end, x, fnCmp) => {
	const sign = Math.sign(end - start)
	if (sign === 0) { return start }

	const state = __initExponentialSearch(start, end - sign, sign)

	let cmp
	for (;;) {
		const value = arr[state.a]
		cmp = fnCmp(x, value) || -1
		const done = __expandExponentialSearch(state, cmp)
		if (done) { break }
	}

	if (state.b === null) {
		return sign > 0
			? cmp > 0 ? state.a + 1 : state.a
			: cmp < 0 ? state.a - 1 : state.a
	}

	if (sign < 0) {
		const tmp = state.a
		state.a = state.b
		state.b = tmp
	}

	for (;;) {
		const value = arr[state.mid]
		cmp = fnCmp(x, value) || -1
		const done = __contractExponentialSearch(state, cmp)
		if (done) { return state.a }
	}
}

const __exponentialSearchLast = (arr, start, end, x, fnCmp) => {
	const sign = Math.sign(end - start)
	if (sign === 0) { return start }

	const state = __initExponentialSearch(start, end - sign, sign)

	let cmp
	for (;;) {
		const value = arr[state.a]
		cmp = fnCmp(x, value) || 1
		const done = __expandExponentialSearch(state, cmp)
		if (done) { break }
	}

	if (state.b === null) {
		return sign > 0
			? cmp > 0 ? state.a + 1 : state.a
			: cmp < 0 ? state.a - 1 : state.a
	}

	if (sign < 0) {
		const tmp = state.a
		state.a = state.b
		state.b = tmp
	}

	for (;;) {
		const value = arr[state.mid]
		cmp = fnCmp(x, value) || 1
		const done = __contractExponentialSearch(state, cmp)

		if (done) { return state.a }
	}
}

const exponentialSearchWith = (arr, x, fnCmp) => __exponentialSearch(arr, 0, arr.length, x, fnCmp)
const exponentialSearchFirstWith = (arr, x, fnCmp) => __exponentialSearchFirst(arr, 0, arr.length, x, fnCmp)
const exponentialSearchLastWith = (arr, x, fnCmp) => __exponentialSearchLast(arr, 0, arr.length, x, fnCmp)

const exponentialSearchWithRight = (arr, x, fnCmp) => __exponentialSearch(arr, arr.length - 1, -1, x, fnCmp)
const exponentialSearchFirstWithRight = (arr, x, fnCmp) => __exponentialSearchFirst(arr, arr.length - 1, -1, x, fnCmp)
const exponentialSearchLastWithRight = (arr, x, fnCmp) => __exponentialSearchLast(arr, arr.length - 1, -1, x, fnCmp)

const exponentialSearchBy = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return exponentialSearchWith(arr, x, (a, b) => compare(xValue, fnMap(b)))
}
const exponentialSearchFirstBy = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return exponentialSearchFirstWith(arr, x, (a, b) => compare(xValue, fnMap(b)))
}
const exponentialSearchLastBy = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return exponentialSearchLastWith(arr, x, (a, b) => compare(xValue, fnMap(b)))
}

const exponentialSearchByRight = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return exponentialSearchWithRight(arr, x, (a, b) => compare(xValue, fnMap(b)))
}
const exponentialSearchFirstByRight = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return exponentialSearchFirstWithRight(arr, x, (a, b) => compare(xValue, fnMap(b)))
}
const exponentialSearchLastByRight = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return exponentialSearchLastWithRight(arr, x, (a, b) => compare(xValue, fnMap(b)))
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
	__exponentialSearchFirst,
	__exponentialSearchLast,
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
