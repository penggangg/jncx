var app = require('http').createServer(handler),  
    io = require('socket.io').listen(app),  
    fs = require('fs');  
//当前在线人数  
var onlineCount = 0;  
  
function handler (req, res) {  
  
    fs.readFile(__dirname + '/index.html',  
        function (err, data) {  
            if (err) {  
                res.writeHead(500);  
                return res.end('Error loading index.html');  
            }  
  
            res.writeHead(200);  
            res.end(data);  
        });  
}  
//连接事件  
io.sockets.on('connection', function (socket) {  
  
    console.log('有新用户进入...');  
    //叠加当前在线人数  
    onlineCount++;  
  
    var tweets = setInterval(function () {  
  
            socket.volatile.emit('onlinenums', {nums : onlineCount});  
  
    }, 1000);  
  
    console.log('当前用户数量:'+onlineCount);  
    //客户端断开连接  
    socket.on('disconnect', function() {  
  
        if(onlineCount > 0 ){  
            //当前在线用户减一  
            onlineCount--;  
            console.log('当前用户数量:'+onlineCount);  
        }  
    });  
});  
  
//启动HTTP服务，绑定端口3000  
app.listen(3000, function(){  
    console.log('listening on *:3000');  
});  