# 1: webpack如何读取入口文件
1) 在/lib/NormalModeule.js中_doBuild方法中的runLoaders方法
会递归执行引入的文件

runLoader方法hooks.readResource读取文件内容的相关钩子

/lib/schemes/FileUriPlugin.js中FileUriPlugin插件hooks.readResource.for(undefined).tapAsync("FileUriPlugin")
就是读取文件的最终地方，执行fs.readFile方法

/lib/WebpackOptionsApply.js中的process方法就是所有插件初始化的地方

# 2: watch是一个怎么样的流程
1): 首先在webpack.config.js里面配置属性{ watch: true }





# 3: 如何添加依赖


# 4.webpack的流程
1：执行lib/webpack.js文件中的webpack方法，该方法就是可以拿到compiler对象
2：compiler对象是从create方法拿到的，里面执行createCompiler方法，该方法就是核心方法
3：createCompiler执行Comiler类，实际上就是执行lib\Compiler.js里面的函数，该方法初始化的
时候，创建很多钩子hooks，定义很多初始值
4: 初始化之后，执行自定义的插件


