middleware 是为app.use()所用

其中use.js中给出的中间件，是先利用req，用req.session.uid  获取用户的id,然后用User.get函数从数据库中获取登陆用户的数据。
再把用户数据传给req.user(后续的中间件和路由可以访问它)和res.locals.user.
明白一件事，中间件是对req进行重重处理,为后续操作服务！