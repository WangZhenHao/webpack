// debug/webpack.config.js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Test = require('./plugin/test/index.js')

module.exports = {
	// 选择调试开发环境
	mode: 'development',
	devtool: 'source-map',
	entry: path.join(__dirname, './index.js'),
	// 在debug目录下会生成一个dist目录，打包完成后会生成一个main.js文件
	output: {
		path: path.join(__dirname, './dist'),
	},
	plugins: [new Test(), new CleanWebpackPlugin()],
	watchOptions: {
    ignored: /node_modules/,
  },
	watch: false,
};
