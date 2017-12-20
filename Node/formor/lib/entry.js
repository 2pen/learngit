var redis = require('redis');
var db = redis.createClient();

module.exports=Entry;

function Entry(obj){
    for(var key in obj){
        this[key]=obj[key];
    }
}


//把对象扔到数据库（列表名为'entries');
Entry.prototype.save = function(fn){
    var entryJSON = JSON.stringify(this);

    db.lpush(
        'entries',
        entryJSON,
        function(err){
            if(err) return fn(err);
            fn();
        }
    );
}

//用来获取消息 （'entries'的列表)  其中参数是函数fn获取一个原对象的数组
Entry.getRange = function(from,to,fn){
    db.lrange('entries',from,to,function(err,items){
        if(err)  return fn(err);
        var entries = [];
        items.forEach((item)=>{
            entries.push(JSON.parse(item));
        });
        fn(null,entries);
    });
};


Entry.count = function(fn){
    db.llen('entries',fn);
};





