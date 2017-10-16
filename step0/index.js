/**
 * @description 手写服务器 level 1
 * @author yang
 */

 var http = require('http')

 var server = http.createServer(function (req,res) {
 	setTimeout(function(){
 		res.setHeader('Content-Type','text/html; charset=utf-8')
 		res.writeHeader(200,'OK!!!')
 		res.write('<html><head><meata charset="gbk"></head>')
 		res.write('<body>')
	 	res.write('<h1>你好</h1>')
	 	res.write('</body>')
	 	res.end('</html>')
 	},2000)
 })
 server.listen(9000)