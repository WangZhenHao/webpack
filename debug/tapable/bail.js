/**
 熔断

 */

const { SyncBailHook } = require('tapable');

class FrontEnd {
	constructor() {
		this.hooks = {
			framwork: new SyncBailHook()
		}
	}

	learnFramework() {
		this.hooks.framwork.call();
	}
}

const Xiaobai = new FrontEnd();

Xiaobai.hooks.framwork.tap('learn framework1', () => {
	console.log('vue is easy')
	return undefined;
})

Xiaobai.hooks.framwork.tap('learn framework2', () => {
	console.log('react is easy');
	return null;
})

Xiaobai.hooks.framwork.tap('learn framwork3', () => {
	console.log('Anglar is easy');
	return true;
})

// 只要其中一个插件有非undefined返回(null也算非undefined) 剩余插件全部停止执行
Xiaobai.learnFramework();
