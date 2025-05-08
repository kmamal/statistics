
const __groupBy = (dst, arr, start, end, fnMap) => {
	for (let i = start; i < end; i++) {
		const item = arr[i]
		const key = fnMap(item)
		const list = dst[key] ??= []
		list.push(item)
	}
	return dst
}


const groupBy = (arr, fnMap) => {
	const res = Object.create(null)
	__groupBy(res, arr, 0, arr.length, fnMap)
	return res
}

const groupByTo = (dst, arr, fnMap) => {
	for (const key of Object.keys(dst)) { delete dst[key] }
	__groupBy(dst, arr, 0, arr.length, fnMap)
	return dst
}

groupBy.to = groupByTo


module.exports = {
	__groupBy,
	groupBy,
}
