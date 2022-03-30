# 1: webpack如何读取入口文件
1) 在/lib/NormalModeule.js中_doBuild方法中的runLoaders方法
会递归执行引入的文件

runLoader方法hooks.readResource读取文件内容的相关钩子

/lib/schemes/FileUriPlugin.js中FileUriPlugin插件hooks.readResource.for(undefined).tapAsync("FileUriPlugin")
就是读取文件的最终地方，执行fs.readFile方法

/lib/WebpackOptionsApply.js中的process方法就是所有插件初始化的地方
