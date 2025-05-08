const Path = require('path')
const Rules = require('./rules')
const Files = require('./files')

class Matcher {
	constructor (globOrArray, options) {
		this._globs = !Array.isArray(globOrArray) ? [ globOrArray ] : globOrArray
		this._options = {}
		this.setCwd(options?.cwd)
	}

	setCwd (cwd) {
		this._options.cwd = cwd ? Path.resolve(cwd) : process.cwd()
		this._rules = Rules.fromGlobs(this._globs, this._options)
	}

	matchesPath (path) {
		const absPath = Path.resolve(this._options.cwd, path)
		return Rules.matchAbsPath(this._rules, absPath)
	}

	async * getFiles (options) {
		yield* Files.filterWithRules(this._rules, {
			cwd: this._options.cwd,
			includeDirs: options?.includeDirs,
		})
	}
}

module.exports = { Matcher }
