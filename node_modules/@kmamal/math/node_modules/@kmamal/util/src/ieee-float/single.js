const BYTES = 4
const MANTISSA_BITS = 23
const MANTISSA_MASK = 2 ** MANTISSA_BITS - 1
const HIDDEN_BIT = 2 ** MANTISSA_BITS
const EXPONENT_BITS = 8
const EXPONENT_MASK = (2 ** EXPONENT_BITS) - 1
const EXPONENT_BIAS = 2 ** (EXPONENT_BITS - 1) - 1

const _toView = (value) => {
	const buffer = new ArrayBuffer(BYTES)
	const view = new DataView(buffer)
	view.setFloat32(0, value, false)
	return view
}

const _toBits = (value) => {
	const view = _toView(value)
	return view.getInt32(0, false)
}

const _sign = (bits) => bits >> (MANTISSA_BITS + EXPONENT_BITS)

const sign = (value) => _sign(_toBits(value))

const _exponent = (bits) => (bits >> MANTISSA_BITS) & EXPONENT_MASK

const exponent = (value) => _exponent(_toBits(value))

const _mantissa = (bits) => bits & MANTISSA_MASK

const mantissa = (value) => _mantissa(_toBits(value))

const parse = (value) => {
	const bits = _toBits(value)
	return {
		sign: _sign(bits),
		exponent: _exponent(bits),
		mantissa: _mantissa(bits),
	}
}

const from = ({ sign: s = 0, exponent: e = 0, mantissa: m = 0 }) => {
	const value = 0
	| ((s & 0x01) << (MANTISSA_BITS + EXPONENT_BITS))
	| ((e & EXPONENT_MASK) << MANTISSA_BITS)
	| ((m & MANTISSA_MASK))

	const buffer = new ArrayBuffer(BYTES)
	const view = new DataView(buffer)
	view.setUint32(0, value, false)
	return view.getFloat32(0, value, false)
}

const nextToward = (value, target) => {
	if (Number.isNaN(value) || Number.isNaN(target)) { return NaN }
	if (value === target) { return value }

	const view = _toView(value)
	const unsigned = view.getUint32(0, false)
	const direction = target > value ? 1 : -1
	const increment = value > 0 ? direction : -direction
	view.setUint32(0, unsigned + increment, false)
	return view.getFloat32(0, false)
}

module.exports = {
	EXPONENT_BITS,
	MANTISSA_BITS,
	EXPONENT_BIAS,
	HIDDEN_BIT,
	sign,
	exponent,
	mantissa,
	parse,
	from,
	nextToward,
}
