const path = require('path')
class Test1 {
	constructor() {
        this.index = 1;
	}

	apply(compiler) {
		const webpack = compiler.webpack;
		compiler.hooks.thisCompilation.tap('test1', (compilation) => {
			console.log(compilation)
			// compilation.hooks.seal.tap('test1', () => {
			// 	compilation.emitAsset(path.join(__dirname, './plugin/1.txt'), new webpack.sources.RawSource('11111', false));
			// })
			compilation.hooks.afterProcessAssets.tap('test1', (asssts) => {
					console.log(asssts)
					const rawSource = compilation.assets['1.txt'];
					const str = rawSource._valueAsString + '位置'
					const code = new webpack.sources.RawSource(str, false)
					compilation.emitAsset('1.txt', code);
			})
		})

		compiler.hooks.make.tap('test1', (compilation) => {
			const code = new webpack.sources.RawSource('11111', false)
			// const str = new webpack.sources.sources(code)
			// console.log(str)
			compilation.emitAsset('1.txt', code);
		})

		// compiler.hooks.make.tap('test1', (compilation) => {

		// 	// compilation.emitAsset('1.txt', code);
		// 	console.log(compilation.assets)
		// 	const rawSource = compilation.assets['1.txt'];
		// 	const str = rawSource._valueAsString + '212121212121'
		// 	const code = new webpack.sources.RawSource(str, false)
		// 	compilation.emitAsset('1.txt', code);
		// })
	}
}

module.exports = Test1;
