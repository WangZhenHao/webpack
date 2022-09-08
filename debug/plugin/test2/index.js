class Test2 {
	constructor() {
        this.index = 1;
	}

	apply(compiler) {
        this.index++;
		compiler.hooks.done.tap('test2', () => {
			console.log('test2', this.index)
		})
		// console.log(compiler, '---------------->')
	}
}

module.exports = Test2;
