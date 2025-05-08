
const __copy = (a, offset, b, start, end) => {
	if (a === b && offset === start) { return }

	const n = end - start
	for (let i = 0; i < n; i++) {
		a[offset + i] = b[start + i]
	}
}

const __copyRight = (a, offset, b, start, end) => {
	if (a === b && offset === start) { return }

	const n = end - start
	for (let i = n - 1; i >= 0; i--) {
		a[offset + i] = b[start + i]
	}
}

const __copyInplace = (arr, offset, start, end) => {
	if (offset === start) { return }

	const overlapsBadly = start < offset && offset < end
	if (!overlapsBadly) {
		__copy(arr, offset, arr, start, end)
	} else {
		__copyRight(arr, offset, arr, start, end)
	}
}


const copy = (a, b, start = 0, end = b.length, offset = 0) => {
	const length = end - start
	const writeEnd = offset + length
	const res = new Array(Math.max(a.length, writeEnd))
	__copy(res, 0, a, 0, offset)
	__copy(res, offset, b, start, end)
	__copy(res, writeEnd, a, writeEnd, a.length)
	return res
}

const copyTo = (dst, a, b, start = 0, end = b.length, offset = 0) => {
	const length = end - start
	const writeEnd = offset + length
	dst.length = Math.max(a.length, writeEnd)
	__copy(dst, 0, a, 0, offset)
	__copy(dst, offset, b, start, end)
	__copy(dst, writeEnd, a, writeEnd, a.length)
	return dst
}

const copy$$$ = (a, b, start = 0, end = b.length, offset = 0) => {
	if (a === b) {
		__copyInplace(a, offset, start, end)
	} else {
		__copy(a, offset, b, start, end)
	}
	return a
}

copy.to = copyTo
copy.$$$ = copy$$$


module.exports = {
	__copy,
	__copyRight,
	__copyInplace,
	copy,
}
