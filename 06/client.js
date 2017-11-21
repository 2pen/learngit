var net=require('net');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const server=net.createConnection({port:2080},()=>{
    server.on('data',chunk=>{
        console.log(chunk.toString());
        const signal=JSON.parse(chunk.toString().trim());
        const protocol=signal.protocol;
        switch(protocol)
        {
            case 'boardcast':
            console.log(signal.from+'<');
            console.log(signal.message);
            rl.prompt();
            break;
            default:
            console.log('no suitable prtocol');
            break;
        }                                                                     //try    catch?????

    });
    rl.question('What is your name?', (name) => {

    rl.setPrompt(`${name}> `);
    // rl.prompt();
    
    rl.on('line', (line) => {

      let send = 
      {
          from:name,
          protocol:'boardcast',
          message:line.toString().trim(),
      }
      rl.prompt();
    //   console.log(line.trim());
      server.write(JSON.stringify(send));
    });
});
    
});


// }).on('close', () => {
//     console.log('Have a great day!');
//     process.exit(0);
//   });


// server.on('data', (chunk) => {
//     try {
//       var signal = JSON.parse(chunk.toString().trim());
//       var procotol = signal.procotol;
//       switch (procotol) {
//         case 'boardcast':
//           console.log('\nboardcast');
//           console.log(signal.from + '>');
//           console.log(signal.message);
//           rl.prompt();

//           break;
//         default:
//           server.write('弄啥咧！你要干的我干不了');
//           break;
//       }
//     } catch (error) {
//       server.write('弄啥咧！');
//     }
//   });


//   rl.on('line', (line) => {
    
//           // {"procotol":"boardcast","from":"张三","message":"弄啥咧！"}
//           var send = {
//             procotol: 'boardcast',
//             from: name,
//             message: line.toString().trim()
//           };
//           server.write(JSON.stringify(send));
    
//           rl.prompt();
    
//         })