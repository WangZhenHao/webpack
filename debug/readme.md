# 1: webpack源码解读介绍

读取文件：
/lib/schemes/FileUriPlugin.js中FileUriPlugin插件hooks.readResource.for(undefined).tapAsync("FileUriPlugin")
就是读取文件的最终地方，执行fs.readFile方法

输出文件：
1: lib\Compiler.js 中的emitAssets方法执行输出文件，在输出文件之前，emitAssets方法会先执行hooks.emit.callAsync(...)钩子。
比如clean-webpack-plugin 插件清空文件就是在这种在hooks.emit.tap('clean-webpack-plugin', () => {})操作的
2: 文件内容输出是执行this.outputFileSystem.writeFile(path,content,cb), cb回调之后，就可以再dist目录查看文件内容了

插件的执行：插件是webpack非常核心的功能
1: lib\webpack.js 中定义了createCompiler函数
2: 里面执行new Compiler(options.context, options), 生成编译示例compiler
3：接下来判断配置项有没有options.plugins，如果又配置，依次执行
4: 判断每一个插件是否执行new操作符，如果是则执行plugin.apply(compiler),如果是一个函数
则执行该函数plugin.call(compiler, compiler)

/lib/WebpackOptionsApply.js中的process方法就是其他插件初始化的地方

loader的执行：
1) 在/lib/NormalModeule.js中_doBuild方法中的runLoaders方法
会递归执行引入的文件

runLoader方法hooks.readResource读取文件内容的相关钩子


# 2: watch是一个怎么样的流程
1): 首先在webpack.config.js里面配置属性{ watch: true }





# 3: 如何添加输出文件
lib\Compilation.js 中的emitAsset方法是创建最终输出文件的hash

emitAsset方法接受三个参数file, source, assetInfo，文件名，内容，信息
调用一般是：compilation.emitAsset(replacedFilename.path, new webpack.sources.RawSource(html, false), replacedFilename.info)

compilation.assets可以看到所有要输出的文件


# 4.webpack的流程
1：执行lib/webpack.js文件中的webpack方法，该方法就是可以拿到compiler对象
2：compiler对象是从create方法拿到的，里面执行createCompiler方法，该方法就是核心方法
3：createCompiler执行Comiler类，实际上就是执行lib\Compiler.js里面的函数，该方法初始化的
时候，创建很多钩子hooks，定义很多初始值
4: 初始化之后，执行自定义的插件


