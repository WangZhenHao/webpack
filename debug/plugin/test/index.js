class Test1 {
	constructor() {
        this.index = 1;
	}

	apply(compiler) {
        this.index++;
		compiler.hooks.done.tap('test1', () => {
			console.log('test1', this.index)
		})
		// console.log(compiler, '---------------->')
	}
}

module.exports = Test1;
