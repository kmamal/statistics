const BYTES = 8
const MANTISSA_BITS = 52
const HIDDEN_BIT = 2 ** MANTISSA_BITS
const EXPONENT_BITS = 11
const EXPONENT_MASK = (2 ** EXPONENT_BITS) - 1
const EXPONENT_BIAS = 2 ** (EXPONENT_BITS - 1) - 1

const TWO_POW_16 = 2 ** 16
const TWO_POW_31 = 2 ** 31
const TWO_POW_32 = 2 ** 32

const _toDataView = (value) => {
	const buffer = new ArrayBuffer(BYTES)
	const view = new DataView(buffer)
	view.setFloat64(0, value, false)
	return view
}

const _sign = (view) => view.getUint8(0, false) >> 7

const sign = (value) => _sign(_toDataView(value))

const _exponent = (view) => (view.getUint16(0, false) >> 4) & EXPONENT_MASK

const exponent = (value) => _exponent(_toDataView(value))

const _mantissa = (view) => {
	const high = view.getUint32(0, false) & 0x0fffff
	const low = view.getUint32(4, false)
	return (high * TWO_POW_32) + low
}

const mantissa = (value) => _mantissa(_toDataView(value))

const parse = (value) => {
	const view = _toDataView(value)
	return {
		sign: _sign(view),
		exponent: _exponent(view),
		mantissa: _mantissa(view),
	}
}

const from = ({ sign: s = 0, exponent: e = 0, mantissa: m = 0 }) => {
	let high = ((e & EXPONENT_MASK) << 20) | ((m / TWO_POW_32) & 0x0fffff)
	if (s) { high += TWO_POW_31 }

	const low = (((m / TWO_POW_16) & 0xffff) * TWO_POW_16) + (m & 0xffff)

	const buffer = new ArrayBuffer(BYTES)
	const view = new DataView(buffer)
	view.setUint32(0, high, false)
	view.setUint32(4, low, false)
	return view.getFloat64(0, false)
}

const nextToward = (value, target) => {
	if (Number.isNaN(value) || Number.isNaN(target)) { return NaN }
	if (value === target) { return value }

	const view = _toDataView(value)
	const unsigned = view.getBigUint64(0, false)
	const direction = target > value ? 1n : -1n
	const increment = value > 0 ? direction : -direction
	view.setBigUint64(0, unsigned + increment, false)
	return view.getFloat64(0, false)
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
