const { SyncHook } =  require('tapable')

class FrontEnd {
	constructor() {
		this.hooks = {
			framework: new SyncHook(['framework'])
		}
	}

	learnFramework(framework) {
		this.hooks.framework.call(framework)
	}
}

const XiaoBai = new FrontEnd();

XiaoBai.hooks.framework.tap('learn framework', framework => {
	console.log(`Xiaobai learn ${framework}`)
})

XiaoBai.learnFramework('Vue');
XiaoBai.learnFramework('react')
