
// /*
//  * GET home page.
//  */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
//   console.log("hi iiiiiiiiiiiiiiiiiiiiiiiiiiii");
// };                            

//以上没有用  因为此路由被entries.list替代了（默认路由  app.get('/',routes); 会调用它；


exports.notfound = function(req,res){            //res.format的参数是MIME和回调函数
  res.status(404).format({
    html:function(){
      res.render('404');
    },
    json:function(){
      res.send({
        message:'Resource not found'
      });
    }
      ,
      xml:function(){
        res.write('<error>\n');
        res.write('  <message>Resource not found</message>\n');
        res.end('</error>\n');
      },
      text:function(){
        res.send("Resource not found\n");
      }
    
  });
}


exports.error = function(err, req, res, next){
  console.error(err.stack);
  var msg;

  switch (err.type) {
    case 'database':
      msg = 'Server Unavailable';
      res.statusCode = 503;
      break;

    default:
      msg = 'Internal Server Error';
      res.statusCode = 500;
  }

  res.format({
    html: function(){
      res.render('5xx', { msg: msg, status: res.statusCode });
    },

    json: function(){
      res.send({ error: msg });
    },

    text: function(){
      res.send(msg + '\n');
    }
  });
};
