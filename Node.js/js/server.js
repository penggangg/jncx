////引入http模块
//var http = require('http'),
//  //创建一个服务器
//  server = http.createServer(function(req, res) {
//      res.writeHead(200, {
//          'Content-Type': 'text/plain'
//      });
//      res.write('hello world!');
//      res.end();
//  });
////监听80端口
//server.listen(80);
//console.log('server started');
var express = require('socket.io'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server); //引入socket.io模块并绑定到服务器
	app.use('/', express.static(__dirname + '/www'));
	server.listen(80);
	
	//socket部分
	io.on('connection', function(socket) {
	    //接收并处理客户端发送的foo事件
	    socket.on('foo', function(data) {
	        //将消息输出到控制台
	        console.log(data);
	    })
	});