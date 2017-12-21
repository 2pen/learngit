
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var register = require('./routes/register');
var messages=require('./lib/messages');
var login = require('./routes/login');
var usser=require('./lib/middleware/user');   //极其诡异！！！！！！！！！
var entries = require('./routes/entries');
var validate = require('./lib/middleware/validate');
var page = require('./lib/middleware/page');
var Entry = require('./lib/entry');
var api = require('./routes/api');

var app = express();

// all environments

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(messages);
app.use('/api',api.auth);             //  /api是挂载点  任何以/api开头的请求路径名和HTTP谓词都会导致这个中间件被调用


//只认证一次，即使不登陆也可以访问user内容？？？！
app.use(usser);
app.use(app.router);
app.use(routes.notfound);
app.use(routes.error);


app.get((req,res,next)=>{
  console.log("************************************");
  next();
});
// console.log("dddddddddddddddddddddddddddddddddddddddddddd");

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
// app.use('/', routes.index);
// app.use('/', routes.index);
// app.use('/',function(req, res){
//   res.render('index', { title: 'Express' });
//   console.log("hi iiiiiiiiiiiiiiiiiiiiiiiiiiii");
// });
app.get('/users', user.list);
app.get('/register',register.form);
app.post('/register',register.submit);
app.get('/login',login.form);
app.post('/login',login.submit);
app.get('/logout',login.logout);
// app.get('/',page(Entry.count,5),entries.list);
app.get('/post',entries.form);
app.post('/post',
validate.required('entry[title]'),
validate.lengthAbove('entry[title]',4)
,entries.submit);
app.get('/api/user/:id',api.user);
app.post('/api/entry',entries.submit);
app.get('/api/entries/:page?',page(Entry.count),api.entries);

app.get('/:page?',page(Entry.count,5),entries.list);




if (process.env.ERROR_ROUTE) {                       //这个内部错误测试是在浏览器上做的，在Postman上显示是406错误，很诡异！
  app.get('/dev/error', function(req, res, next){
    var err = new Error('database connection failed');
    err.type = 'database';
    next(err);
  });
}


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
