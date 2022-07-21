class Test {
	constructor() {

	}

	apply(compiler) {
		compiler.hooks.beforeCompile.tap('test', () => {
			console.log('开始编译')
		})
		// console.log(compiler, '---------------->')
	}
}

module.exports = Test;
