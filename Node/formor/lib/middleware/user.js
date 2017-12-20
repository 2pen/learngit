var User = require('../user');

module.exports = function(req, res, next){
  if (req.remoteUser) {
    res.locals.user = req.remoteUser;        //用加载中间件（api.auth)和此API合作！
  }
  var uid = req.session.uid;
  if (!uid) return next();                  //因为 在rest请求中，req.session.uid为空，所以next()了  所以下面的无效
  User.get(uid, function(err, user){
    if (err) return next(err);
    req.user = res.locals.user = user;
    console.log(res.locals.user);            //对应上面！！
    console.log("))))))))))))))))))))))))))))))))))))))))))))))))))))))))");
    next();
  });
};
