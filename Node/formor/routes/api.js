var express = require('express');
var User = require('../lib/user');
var Entry = require('../lib/entry');

exports.auth = express.basicAuth(User.authenticate);     //express.basicAuth估计会自动传参把！！！！？

exports.user = function(req,res,next){
    User.get(req.params.id,function(err,user){
        if(err) return next(err);
        if(!user.id)  return res.send(404);
        res.json(user);
    });
};

exports.entries = function(req,res,next){
    var page = req.page;
    Entry.getRange(page.from,page.to,function(err,entries){
        if(err)  return next(err);
        // res.json(entries);
        
        res.format({
            'application/json':function(){         //原本申请json时会出错，后来用res.json发送过后，再用res.send又没问题了。。。。？
                res.send(entries);
            },
            'application/xml':function(){
                res.render('entries/xml',{entries:entries});
            }
        });
    });
};