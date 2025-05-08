
const diff = (data) => {
	const { length } = data
	const res = new Array(length)
	res[0] = null
	let prev = data[0]
	for (let i = 1; i < length; i++) {
		const value = data[i]
		res[i] = value - prev
		prev = value
	}
	return res
}

const growth = (data) => {
	const { length } = data
	const res = new Array(length)
	res[0] = null
	let prev = data[0]
	for (let i = 1; i < length; i++) {
		const value = data[i]
		res[i] = value / prev
		prev = value
	}
	return res
}

const top = (data) => {
	const { length } = data
	const res = new Array(length)
	let max = -Infinity
	for (let i = 0; i < length; i++) {
		max = res[i] = Math.max(max, data[i])
	}
	return res
}

const bottom = (data) => {
	const { length } = data
	const res = new Array(length)
	let min = -Infinity
	for (let i = 0; i < length; i++) {
		min = res[i] = Math.min(min, data[i])
	}
	return res
}


const addVars = (a, b) => {
	if (a.length !== b.length) { throw new Error("bad lengths") }

	const { length } = a
	const res = new Array(length)
	for (let i = 0; i < length; i++) {
		res[i] = a[i] + b[i]
	}
	return res
}

const subVars = (a, b) => {
	if (a.length !== b.length) { throw new Error("bad lengths") }

	const { length } = a
	const res = new Array(length)
	for (let i = 0; i < length; i++) {
		res[i] = a[i] - b[i]
	}
	return res
}

const mulVars = (a, b) => {
	if (a.length !== b.length) { throw new Error("bad lengths") }

	const { length } = a
	const res = new Array(length)
	for (let i = 0; i < length; i++) {
		res[i] = a[i] * b[i]
	}
	return res
}

const divVars = (a, b) => {
	if (a.length !== b.length) { throw new Error("bad lengths") }

	const { length } = a
	const res = new Array(length)
	for (let i = 0; i < length; i++) {
		res[i] = a[i] / b[i]
	}
	return res
}

module.exports = {
	diff,
	growth,
	top,
	bottom,
	addVars,
	subVars,
	mulVars,
	divVars,
}
