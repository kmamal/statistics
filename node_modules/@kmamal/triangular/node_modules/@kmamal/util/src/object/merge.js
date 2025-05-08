const { copyDeep } = require('./copy')
const { clone } = require('./clone')

const _isObject = (x) => x
	&& typeof x === 'object'
	&& !Array.isArray(x)

const __merge = (dst, a, b) => {
	for (const key of Object.keys(b)) {
		const bValue = b[key]
		if (!_isObject(bValue)) {
			dst[key] = bValue
			continue
		}
		const aValue = a[key]
		if (!_isObject(aValue)) {
			dst[key] = bValue
			continue
		}
		let dstValue = dst[key]
		if (!_isObject(dstValue)) {
			dstValue = dst[key] = {}
		}
		__merge(dstValue, aValue, bValue)
	}
}


const merge = (a, b) => {
	const res = clone(a)
	__merge(res, a, b)
	return res
}

const mergeTo = (dst, a, b) => {
	copyDeep(dst, a)
	__merge(dst, a, b)
	return a
}

const merge$$$ = (a, b) => {
	__merge(a, a, b)
	return a
}

merge.to = mergeTo
merge.$$$ = merge$$$


module.exports = {
	__merge,
	merge,
}
