const path = require('path')
class Test1 {
	constructor() {
        this.index = 1;
	}

	apply(compiler) {
		const webpack = compiler.webpack;
		compiler.hooks.afterCompile.tap('test1', (compilation) => {
			console.log(compilation)
			// compilation.hooks.seal.tap('test1', () => {
			// 	compilation.emitAsset(path.join(__dirname, './plugin/1.txt'), new webpack.sources.RawSource('11111', false));
			// })
		})

		compiler.hooks.make.tap('test1', (compilation) => {
			compilation.emitAsset('1.txt', new webpack.sources.RawSource('11111', false));
		})
	}
}

module.exports = Test1;
