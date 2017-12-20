
var User=require('../lib/user');
exports.form = function(req,res){
    res.render('login',{title:'Login'});
};

//登陆

exports.submit = function(req,res,next){
    
    var data=req.body.user;
    User.authenticate(data.name,data.pass,function(err,user){
        if(err) return next(err);
        if(user)
        {
            req.session.uid=user.id;            //为认证存储uid;
            res.redirect('/');                  //重定向到记录列表页！！！！
        }else{
            res.error("登录失败！");
            res.redirect('back');                //重定向到登陆页面！              
        }
    });
};

//退出
exports.logout = function(req,res){
    req.session.destroy(function(err){
        if(err) throw err;
        res.redirect('/');
    });
}










