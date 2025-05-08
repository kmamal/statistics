
const _eq = (a, b) => a === b ? true : undefined

const _matchesWith = (a, b, fnEq, prop) => {
	const res = fnEq(a, b, prop)
	if (res !== undefined) { return res }

	// Primitive types and functions
	if (a === b) { return true }
	if (Number.isNaN(a) && Number.isNaN(b)) { return true }
	if (a === null || b === null) { return false } // Since `typeof null === 'object'`, but we want to handle it here

	const aType = typeof a
	const bType = typeof b
	if (aType !== bType) { return false }

	if (bType !== 'object') { return false } // Should have been handled in `a === b`

	const bKeys = Object.keys(b)
	for (let i = 0; i < bKeys.length; i++) {
		const key = bKeys[i]
		if (!Object.hasOwn(a, key) || !_matchesWith(a[key], b[key], fnEq, key)) { return false }
	}
	return true
}

const matchesWith = (obj, pattern, fnEq) => _matchesWith(obj, pattern, fnEq)

const matches = (obj, pattern) => _matchesWith(obj, pattern, _eq)

module.exports = {
	matchesWith,
	matches,
}
