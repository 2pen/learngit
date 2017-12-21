var express = require('express');
var res = express.response;   //Express 给响应对象用的原型   向这个对象添加属性，所有的中间件和路由都能访问他们！！！》？？？
res.message = function(msg,type){
    type = type || 'info';
    var sess = this.req.session;      //这里的this    res.message 是原型中的方法，  this 取决于谁用它？？？？？？？？？？？？
    // ？？？？？？？？？？？？？？？
    // ？？？？？？？？？？？？？？？？
    // ？？？？？？？？？？？？？？？？
    // ？？？？？？？？？？？？？？？？
    //console.log(sess);
    sess.messages = sess.messages || [];
    sess.messages.push({type:type,string:msg});
};


//以上为了能在会话变量中形成消息队列！！！




res.error = function(msg){
    return this.message(msg,'error');
};

// module.exports = function(req,res,next){                     //输出中间件！！
//     res.locals.messages = req.session.messages || [];  //    把消息高效的输出到所有要渲染的模板上！！！
//     res.locals.removeMessages=function(){
//         req.session.messages=[];
//     };
//     next();
// };
module.exports = function(req, res, next){
    res.locals.messages = req.session.messages || [];
    res.locals.removeMessages = function(){
      req.session.messages = [];
    };
    next();
  };