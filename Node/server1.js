const net=require('net');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
var server=net.createServer(socket=>{
    console.log(socket.remoteAddress);
    socket.on('data',chunk=>{
        console.log(chunk.toString());
    });
        
     
            rl.on('line', (line) => {
              socket.write(line.trim());
            });
  
});
server.on('error',(err)=>{
    throw err;
});
server.listen(2080,()=>{
    console.log('listening succeed!');
});


