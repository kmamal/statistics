const Path = require('path')
const Rules = require('./rules')
const { recurse } = require('@kmamal/recurse')

const filterWithRules = async function * (rules, options) {
	const cwd = options?.cwd ? Path.resolve(options.cwd) : process.cwd()

	for await (const entry of recurse(cwd, {
		includeDirs: options?.includeDirs,
		filter: (fsPath, stats) => {
			if (!stats) { return true }
			const path = stats.isDirectory() ? `${fsPath}/` : fsPath
			return Rules.matchAbsPath(rules, path)
		},
	})) {
		const { path: fsPath, stats } = entry
		const path = stats.isDirectory() ? `${fsPath}/` : fsPath
		yield { path, stats }
	}
}

module.exports = { filterWithRules }
