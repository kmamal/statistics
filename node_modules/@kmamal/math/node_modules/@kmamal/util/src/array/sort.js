const {
	__timsort,
	timsortWith,
	timsortBy,
	timsort,
} = require('./sorting/timsort')

// NOTE: They are not all that nice
const __sort = __timsort

const sortWith = timsortWith
const sortBy = timsortBy
const sort = timsort

module.exports = {
	__sort,
	sortWith,
	sortBy,
	sort,
}
