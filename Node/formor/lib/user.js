var redis = require("redis");
var db=redis.createClient();
var crypto = require('crypto')


 function User(obj){
     for(var key in obj){
         this[key]=obj[key];
     }
 }
 module.exports=User;

 User.prototype.save = function(fn){
     if(this.id){
         this.update(fn);
     }else{
         var user = this;
         db.incr('user:ids',function(err,id){
             if(err) return fn(err);
             user.id=id;
             user.hashPassword(function(err){
                 if(err) return fn(err);
                 user.update(fn);
             });
         });
     }
 };

 User.prototype.update = function(fn){
     var user = this;
     var id=user.id;
     db. set('user:id'+user.name,id,function(err){
         if(err) return fn(err);
         db.hmset('user:'+id,user,function(err){
             fn(err);
         });
     });
 };

 User.prototype.hashPassword = function(fn){
     var user=this;
     var shasum = crypto.createHash('md5');

     //user.pass  来自新建用户对象时；
        
         shasum.update(user.pass);
    
     
     
         var d = shasum.digest('hex');
     
         user.pass=d;
         fn();
 }

 //如果对象上有.toJSON，JSON.stringify,就会用它返回的JSON格式（目的是限制返回的属性）

 User.prototype.toJSON = function(){
     return {
         id:this.id,
         name:this.name
     }
 };


// var tobi = new User({
//   name: 'Tobi',
//   pass: 'im a ferret',
//   age: '2'
// });

// tobi.save(function(err){
//   if (err) throw err;
//   console.log('user id %d', tobi.id);
// });


User.getByName = function(name,fn){
    User.getId(name,function(err,id){
        if(err) return fn(err);
        User.get(id,fn);
    });
};

User.getId = function(name,fn){
    db.get('user:id'+name,fn)                //由name得到id;
}

User.get = function(id,fn){
    db.hgetall('user:'+id,function(err,user){                    //获得普通对象哈希
        if(err) return fn(err);
        fn(null,new User(user));
    });
};

//认证用户的名称和密码
User.authenticate = function(name,pass,fn){
    User.getByName(name,function(err,user){
        if(err)  return fn(err);
        if(!user.id) return fn();  //这说明前面取出用户时  name没有也照样取。

        var shasum = crypto.createHash('md5');
        shasum.update(pass);
        var hash2 = shasum.digest('hex');
        if(hash2==user.pass)            //密码有效
        return fn(null,user);       
        fn();                           //密码无效
    });
};