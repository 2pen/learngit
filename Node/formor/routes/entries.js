var Entry = require('../lib/entry');

exports.list = function(req,res,next){
    var page=req.page;
    Entry.getRange(page.from,page.to,function(err,entries){      //取出所有的元素！！！
        if(err)  return next(err);

        res.render('entries.ejs',{
            title:'Entries',
            entries:entries
        });
    });
};

exports.form = function(req,res){
    res.render('post',{title:'Post'});
};

//提交表单，把对象扔到数据库中，并res.redirect('/')返回的首页！！
exports.submit = function(req, res, next){
    var data = req.body.entry;
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    // console.log(res.locals);
    var entry = new Entry({
      "username": res.locals.user.name,
      "title": data.title,
      "body": data.body
    });
  
    entry.save(function(err) {
      if (err) return next(err);
      if (req.remoteUser) {
        res.json({message: 'Entry added.'});
      } else {
        res.redirect('/');
      }
    });
  };
  