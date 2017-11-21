const net=require('net');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
var server=net.createServer(socket=>{
    function boardcast(signal) {
        console.log(signal);
        // 肯定有用户名和消息
        var username = signal.from;
        var message = signal.message;
        // 我们要发给客户端的东西
        var send = {
          protocol: signal.protocol,
          from: username,
          message: message
        };
        socket.write(JSON.stringify(send));
    }
    
    console.log(socket.remoteAddress);
    socket.on('data',chunk=>{
        //socket.write(chunk);
        // console.log(chunk.toString());
        var signal = JSON.parse(chunk.toString().trim());
        var protocol = signal.protocol;
        boardcast(signal);
    });
        
     

  
});
server.on('error',(err)=>{
    throw err;
});
server.listen(2080,()=>{
    console.log('listening succeed!');
});
