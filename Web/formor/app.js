
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
var det = require('./routes/det');

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
app.use(usser);
app.use(app.router);


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

app.get('/det',det.form);
app.get('/users', user.list);
app.get('/register',register.form);
app.post('/register',validate.required('user[name]'),validate.required('user[pass]'),register.submit);
app.get('/login',login.form);
app.post('/login',login.submit);
app.get('/logout',login.logout);
// app.get('/',page(Entry.count,5),entries.list);
app.get('/post',entries.form);
app.post('/post',
validate.required('entry[title]'),
validate.lengthAbove('entry[title]',4)
,entries.submit);

app.get('/:page?',page(Entry.count,3),entries.list);






http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
