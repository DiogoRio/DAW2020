var http = require('http')
var fs = require('fs')
var aux = require('./mymod.js')


http.createServer(function (req, res) {
    console.log("-------------------"
    + "\n" + req.method + "\n" + req.url + "\n" + aux.myDateTime()
    + "\n-----------------")
    if(req.url.match(/\/arqs(\/1[0-1][0-9]$|\/[1-9][0-9]?$|\/12[0-2]$)/)){
        var num = req.url.split("/")[2]
        fs.readFile('site/arq' + num + '.html', function(err, data) {
            res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
            res.write(data)
            res.end()
     })
    }
    else if(req.url.match(/\/arqs$/)){
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
            res.write(data)
            res.end()
     })
    }
    else{
        res.writeHead(200, {'Content-Type':'text/html;  charset=utf-8'})
        res.write("<p>Erro</p>")
        res.end()
    }
}).listen(5555)