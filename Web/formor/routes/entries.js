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


exports.submit = function(req,res,next){
    var data=req.body.entry;
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(res.locals);

    var entry = new Entry({
        "username":res.locals.user.name,
        // "username":req.session.name,
        
        "title":data.title,
        "body":data.body
    });

    entry.save(function(err){
        if(err)  return next(err);
        res.redirect('/');
        
    });
};