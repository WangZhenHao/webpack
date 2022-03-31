const fs = require('fs');
const path = require('path')
fs.watch(path.join(__dirname, './a.txt'), function(event, fileName) {
	console.log(fileName)
})
