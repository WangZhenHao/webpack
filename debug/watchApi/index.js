const fs = require('fs');
const path = require('path')
// fs.watch(path.join(__dirname, './a.txt'), function(event, fileName) {
// 	console.log(fileName)
// })
fs.readFile(path.join(__dirname, './a.txt'), function(err, dataStr) {
	console.log(err)
	if(err) {
		return
	}
	fs.writeFile(path.join(__dirname, './output.txt'), dataStr, function(err) {
		if (err) {
				return console.error(err);
		}
		console.log("数据写入成功！");
	})
})
