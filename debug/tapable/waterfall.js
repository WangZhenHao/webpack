/**
 瀑布流

 */


const { SyncWaterfallHook  } =  require('tapable')

class FrontEnd {
    constructor() {
        this.hooks = {
            framework: new SyncWaterfallHook(['framework']),
        };
    }

    learnFramework(framework) {
        this.hooks.framework.call(framework);
    }
}

const Xiaobai = new FrontEnd();

// 上一个插件的返回值会当做下一个插件的入参
Xiaobai.hooks.framework.tap('learn framework', (framework) => {
    console.log(`${framework} is easy, let's play vue2`);
    return 'vue2';
});

Xiaobai.hooks.framework.tap('learn framework', (arg) => {
    console.log(`${arg} is also easy, let's play react`);
    return 'react'
});

Xiaobai.hooks.framework.tap('learn framework', (arg) => {
    console.log(`${arg} is amazing`);
});

Xiaobai.learnFramework('vue1');
