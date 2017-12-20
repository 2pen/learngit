var connect = require('connect');

connect().use((req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.end('hello world');
    console.log(")))))))))))))))))))))");
}).listen(3000);