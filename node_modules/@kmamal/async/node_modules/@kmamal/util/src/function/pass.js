const { some } = require('../array/some')

const kAwait = Symbol("await")

const passSync = (_value, funcs) => {
	let value = _value
	for (const func of funcs) {
		value = func(value)
	}
	return value
}

const passAsync = async (_value, funcs) => {
	let value = _value
	for (const func of funcs) {
		if (func === kAwait) {
			value = await value
		} else {
			value = func(value)
		}
	}
	return value
}

const pass = (value, ...funcs) => {
	const isAsync = some(funcs, (x) => x === kAwait)
	return isAsync
		? passAsync(value, funcs)
		: passSync(value, funcs)
}

pass.await = kAwait

module.exports = { pass }
