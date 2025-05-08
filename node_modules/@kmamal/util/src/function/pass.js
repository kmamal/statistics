
const kAwait = Symbol("await")
const _isAsync = (x) => x === kAwait

const passSync = (_value, funcs) => {
	let value = _value
	for (let i = 0; i < funcs.length; i++) {
		value = funcs[i](value)
	}
	return value
}

const passAsync = async (_value, funcs) => {
	let value = _value
	for (let i = 0; i < funcs.length; i++) {
		const func = funcs[i]
		if (func === kAwait) {
			value = await value
		} else {
			value = func(value)
		}
	}
	return value
}

const pass = (value, ...funcs) => {
	const isAsync = funcs.some(_isAsync)
	return isAsync
		? passAsync(value, funcs)
		: passSync(value, funcs)
}

pass.await = kAwait

module.exports = { pass }
