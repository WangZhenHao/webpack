// debug/start-debug.js

// 看根目录的package.json的main字段，可知入口在lib/webpack.js
const webpack = require('../lib/webpack');
const config = require('./webpack.config');

// compiler是webpack的启动入口，直接调用即可
const compiler = webpack(config);
compiler.run();