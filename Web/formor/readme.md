#数据存储
##在链表中，把消息内容和发言人打包成JSON字符串传给数据库，在获取信息时，把JSON解析后作为整体传给一个数组，这个数组再传给模板引擎，遍历后可全部输出！！
##
在模板引擎中引入图片时，默认在public目录下！

#有些问题
已解决：在app.js文件中，如果 var user =require("./lib/middleware/user")  就会报错，如果改为usser就没问题  即改变user这个变量名就没事！
因为express初始生成一句话  var user = require("./routes/user.js")
 

##在./views/entries.ejs中，Error: Could not find include include file.是因为多了一句话    <% include pager %>  注释也没用  删了才正常！

##在这个express中   next仅仅是用来报错的吗？？？next(err)    例如有  exports.form(funciton(req,res))        exports.submit(function(req,res,next))!!

##  在 ./routes/entries  的exports.submit中    "username":res.locals.user.name,res.locals  既然这里用就肯定有效   那这句话：“在 express 中  用户被重定向后 res.locals的内容会被重置 ”该怎么理解？？？！

## res.locals.user.name 读取不了  在./routes/entries.js 的exports.submit中！！

#解决了些问题

##神奇  昨天app.use('/')  可以启动menu.ejs模板。app.get('/')不可以。
##今天   app.use('/')  反而会出错！app.get('/')才可以。
但是 今天app.get/use   后面用了多个中间件
今天增添了新的功能
* 校验用户内容提交
* 对表单进行字数和非空限制  （涉及几个高度集成的中间件，其中亮点是用split的正则把字符串以 [ 或]进行分割
* 实现分页

其实一个路数  
   实现功能就要设计  数据库的读取  中间件怎么写（数据库中间件和路由中间件）  将中间件和路由进行app.get/post组合  在路由中间件中调用模板引擎。其中还涉及会话处理
   和获取提价的信息和全局数据。

//摘取博文
获取请求很中的参数是每个web后台处理的必经之路，nodejs的 express框架 提供了四种方法来实现。
req.body
req.query
req.params
req.param()       //已废除
//



##app.use可以启动 menu.ejs模板   app.get启动不了！！
###              app.use(messages);
###             app.use(usser);
###            app.use(app.router);  可以保留res.locals.user.name   即app.use(app.router)在下面   这种顺序可能涉及那句话的原理：“在 express 中  用户被重定向后 res.locals的内容会被重置 ”！！！！！！

##书上p192说，因为这个中间件既不接受选项也不返回第二个函数，所以你可以调用app.use(messages),而无需调用app.use(messages)，为了适应将来发展，第三方中间件最好用app.use(messages())   实践下来  app.use(message())会有问题  。书上这个观点有问题  app.use()的参数是对象，而不是去执行函数  所以应该是app.use(message)!!!??


##在.\lib\middleware\page.js中  关于fn的处理非常有意思！！！