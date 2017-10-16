var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

var routes = {
  '/test1': function(req, res){
    res.end(JSON.stringify(req.query))
  },

  '/test2': function(req, res){
    res.end('match /b')
  },

  '/a/b': function(req, res){
    res.end('match /a/b')
  },

  '/search': function(req, res){
    //console.log(req.body)
    res.end('username='+req.body.username+',password='+req.body.password)

  }

}


var server = http.createServer(function(req, res){
  routePath(req, res)
})

server.listen(9000)
console.log('visit http://localhost:9000' )


function routePath(req, res){
  if(req.url === '/'){
    req.url += 'index.html' 
  }
  var pathObj = url.parse(req.url, true)

 
  var handleFn = routes[pathObj.pathname]

  if(handleFn){
    //get 请求处理
    req.query = pathObj.query

    //参考 https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
    // post 请求处理
    var body = ''
    req.on('data', function(chunk){
      body += chunk
    }).on('end', function(){
      req.body = parseBody(body)
      handleFn(req, res)
    })
    
  }else {
    staticRoot(__dirname, req, res)
  }
}

function staticRoot(staticPath, req, res){
  var pathObj = url.parse(req.url, true)
  var filePath = path.join(staticPath, pathObj.pathname)
  fs.readFile(filePath,'binary', function(err, content){
    if(err){
      res.writeHead('404', 'haha Not Found')
      return res.end()
    }
    res.writeHead(200, 'Ok')
    res.write(content, 'binary')
    res.end()  
  })

}

function parseBody(body){
  //console.log(body)
  var obj = {}
  body.split('&').forEach(function(str){
    obj[str.split('=')[0]] = str.split('=')[1]
  })
  //console.log(obj)
  return obj
}