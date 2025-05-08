
const match = (str, regexp) => str.match(regexp)
const matchAll = (str, regexp) => str.matchAll(regexp)
const search = (str, regexp) => str.search(regexp)

module.exports = {
	match,
	matchAll,
	search,
}
