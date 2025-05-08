
const __groupBy = (dst, arr, start, end, fnMap) => {
	for (let i = start; i < end; i++) {
		const item = arr[i]
		const key = fnMap(item)
		let list = dst.get(key)
		if (list === undefined) { dst.set(key, list = []) }
		list.push(item)
	}
	return dst
}


const groupBy = (arr, fnMap) => {
	const res = new Map()
	__groupBy(res, arr, 0, arr.length, fnMap)
	return res
}

const groupByTo = (dst, arr, fnMap) => {
	__groupBy(dst, arr, 0, arr.length, fnMap)
	return dst
}

groupBy.to = groupByTo


module.exports = {
	__groupBy,
	groupBy,
}
