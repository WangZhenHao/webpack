/**
 并行

 */


const { AsyncSeriesHook } =  require('tapable')

class FrontEnd {
	constructor() {
		this.hooks = {
			bundler: new AsyncSeriesHook(['bundler'])
		}
	}

	learnBundler(bundler) {
		this.hooks.bundler.callAsync(bundler, () => {
			console.timeEnd('costTime')
		})
	}
}

const Xiaobai = new FrontEnd();

Xiaobai.hooks.bundler.tapAsync('learn bundler1', (bundler, callback) => {
	console.log(`Xiaobai learn ${bundler} for the first time`)
	setTimeout(() => {
		callback();
	}, 1000)
})

Xiaobai.hooks.bundler.tapAsync('learn bundler2', (bundler, callback) => {
	console.log(`Xiaobai learn ${bundler} for the second time`);
	setTimeout(() => {
			callback();
	}, 2000);
});

console.time('costTime');
Xiaobai.learnBundler('webpack')
/**

Xiaobai learn webpack for the first time

Xiaobai learn webpack for the second time

costTime: 3.018s

 */