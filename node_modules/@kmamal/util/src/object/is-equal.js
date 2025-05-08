
const isEqualWith = (a, b, fnEq) => {
	const res = fnEq(a, b)
	if (res !== undefined) { return res }

	// Primitive types and functions
	if (a === b) { return true }
	if (Number.isNaN(a) && Number.isNaN(b)) { return true }
	if (a === null || b === null) { return false } // Since `typeof null === 'object'`, but we want to handle it here

	const aType = typeof a
	const bType = typeof b
	if (aType !== bType) { return false }

	if (aType !== 'object') { return false } // Should have been handled in `a === b`

	// Array
	const aIsArray = Array.isArray(a)
	const bIsArray = Array.isArray(b)
	if (aIsArray !== bIsArray) { return false }

	if (aIsArray) {
		const aLength = a.length
		const bLength = b.length
		if (aLength !== bLength) { return false }

		for (let i = 0; i < aLength; i++) {
			if (!isEqualWith(a[i], b[i], fnEq)) { return false }
		}
		return true
	}

	// Map
	const aIsMap = a instanceof Map
	const bIsMap = b instanceof Map
	if (aIsMap !== bIsMap) { return false }
	if (aIsMap) {
		if (a.size !== b.size) { return false }

		const bKeySet = new Set(b.keys())
		forEachA:
		for (const [ aKey, aValue ] of a.entries()) {
			for (const bKey of bKeySet.values()) {
				if (isEqualWith(aKey, bKey, fnEq)) {
					const bValue = b.get(bKey)
					if ((bValue === undefined && !b.has(bKey)) || !isEqualWith(aValue, bValue, fnEq)) { return false }
					bKeySet.delete(bKey)
					continue forEachA
				}
			}
			return false
		}
		return true
	}

	// Set
	const aIsSet = a instanceof Set
	const bIsSet = b instanceof Set
	if (aIsSet !== bIsSet) { return false }
	if (aIsSet) {
		if (a.size !== b.size) { return false }

		const bValuesSet = new Set(b.values())
		forEachA:
		for (const aValue of a.values()) {
			for (const bValue of bValuesSet.values()) {
				if (isEqualWith(aValue, bValue, fnEq)) {
					bValuesSet.delete(bValue)
					continue forEachA
				}
			}
			return false
		}
		return true
	}

	// Object
	const aKeys = Object.keys(a)
	const bKeys = Object.keys(b)
	if (aKeys.length !== bKeys.length) { return false }

	for (let i = 0; i < aKeys.length; i++) {
		const aKey = aKeys[i]
		if (!Object.hasOwn(b, aKey) || !isEqualWith(a[aKey], b[aKey], fnEq)) { return false }
	}
	return true
}

const isEqual = (a, b) => isEqualWith(a, b, () => undefined)

module.exports = {
	isEqualWith,
	isEqual,
}
