const Fs = require('fs')
const Path = require('path')
const { Deferred } = require('@kmamal/async/deferred')

const _produce = async (deferredNode, fnPred) => {
	if (deferredNode.state() === Deferred.State.PRODUCING) { return true }

	if (deferredNode.state() === Deferred.State.NEW) {
		await deferredNode.produce(async ({ path }) => {
			if (fnPred && !await fnPred(path, null)) { return null }

			const stats = await Fs.promises.stat(path)
			if (fnPred && !await fnPred(path, stats)) { return null }

			if (!stats.isDirectory()) { return { path, stats, done: true } }

			const dir = await Fs.promises.opendir(path)
			const firstChild = new Deferred({ dir })
			return { path, stats, done: false, firstChild }
		})
		return null
	}

	const node = await deferredNode.get()
	if (!node || node.done) { return false }

	let morePending = false
	let deferredChild = node.firstChild
	for (;;) {
		if (deferredChild.state() === Deferred.State.PRODUCING) { return true }

		if (deferredChild.state() === Deferred.State.NEW) {
			await deferredChild.produce(async ({ dir }) => {
				const dirent = await dir.read()
				if (!dirent) {
					dir.close()
					return null
				}

				return {
					node: new Deferred({ path: Path.join(node.path, dirent.name) }),
					next: new Deferred({ dir }),
				}
			})
			return null
		}

		const child = await deferredChild.get()
		if (!child) { break }

		const deferredChildNode = child.node
		const result = await _produce(deferredChildNode, fnPred)
		if (result === null) { return null }
		morePending ||= result === true

		deferredChild = child.next
	}

	node.done = !morePending
	return morePending
}

const _traverse = async function * (deferredNode, includeDirs) {
	const node = await deferredNode.get()
	if (!node) { return }

	const isDir = Boolean(node.firstChild)

	if (!isDir || includeDirs) {
		yield {
			path: node.path,
			stats: node.stats,
		}
	}

	if (!isDir) { return }

	for (;;) {
		const childNode = await node.firstChild.get()
		if (!childNode) { return }
		yield* _traverse(childNode.node, includeDirs)
		node.firstChild = childNode.next
	}
}

const recurse = async function * (path, options) {
	const cwd = options?.cwd ? Path.resolve(options.cwd) : process.cwd()
	const absPath = Path.resolve(cwd, path)

	const includeDirs = options?.includeDirs
	const fnPred = options?.filter

	const concurrency = options?.concurrency ?? 20
	const treeRoot = new Deferred({ path: absPath })

	let numIdleWorkers = concurrency
	let error = null

	const onDone = (result) => {
		if (error) { return }
		numIdleWorkers++
		if (result !== null) { return }
		produce()
	}

	const onError = (_error) => { error = _error }

	const produce = () => {
		while (numIdleWorkers > 0) {
			numIdleWorkers--
			_produce(treeRoot, fnPred).then(onDone, onError)
		}
	}
	produce()

	for await (const value of _traverse(treeRoot, includeDirs)) {
		if (error) { throw error }
		yield value
	}
}

module.exports = { recurse }
