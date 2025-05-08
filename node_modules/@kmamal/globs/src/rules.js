const Path = require('path')
const { fromGlob } = require('./regex')

const fromGlobs = (globs, options) => {
	const cwd = options?.cwd ? Path.resolve(options.cwd) : process.cwd()
	return globs.map((glob) => {
		const exclude = glob[0] === '!'
		const dir = glob.at(-1) === '/'
		const globBody = exclude ? glob.slice(1) : glob
		const hasSlash = globBody.slice(0, -1).includes('/')
		const pre = hasSlash ? '' : '**'
		const post = dir ? '**/*' : ''
		const regex = fromGlob(Path.join(cwd, pre, globBody, post))
		return { regex, exclude, dir }
	})
}

const matchAbsPath = (rules, absPath) => {
	const isDir = absPath.at(-1) === '/'
	let isIncluded = isDir
	for (const pattern of rules) {
		if (false
			|| (isDir && !pattern.dir)
			|| isIncluded !== pattern.exclude
			|| !pattern.regex.test(absPath)
		) { continue }
		isIncluded = !isIncluded
	}
	return isIncluded
}

const matchPath = (rules, path, options) => {
	const cwd = options?.cwd ? Path.resolve(options.cwd) : process.cwd()
	const absPath = Path.resolve(cwd, path)
	return matchAbsPath(rules, absPath)
}

module.exports = {
	fromGlobs,
	matchAbsPath,
	matchPath,
}
