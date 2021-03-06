/**
 * @description 手写服务器 level 2
 * @author yang
 */

 var http = require('http')
 var path = require('path')
 var fs = require('fs')
 var url = require('url')

 function staticRoot(staticPath,req,res){
 	var pathObj = url.parse(req.url,true)

 	if(pathObj.pathname === '/'){
 		pathObj.pathname += 'index.html'
 	}

 	var filePath = path.join(staticPath,pathObj.pathname)

 	fs.readFile(filePath,'binary',function(err,fileContent){
 		if (err) {
 			console.log('404')
 			res.writeHead(404,'not found')
 			res.end('<h1>404 Not Found</h1>')
 		}else {
 			console.log('OK')
 			res.writeHead(200,'OK')
 			res.write(fileContent,'binary')
 			res.end()
 		}
 	})
 }

 var server = http.createServer(function (req,res) {
 	console.log(__dirname)
 	switch (req.url) {
 		case '/test1':
 			res.end(fs.readFileSync(__dirname + '/test1'))
 			break;
		case '/test2':
			res.end(fs.readFileSync(__dirname + '/test2'))
			break;
		default :
			staticRoot(__dirname,req,res)
 	}
 })
 server.listen(9000)