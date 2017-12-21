function User(obj){
    for(var key in obj){
        this[key] = obj[key];
    }
}
User.prototype.hello=function(){};
var user=new User({name:"1",
pass:"b"});
console.log(user.hello);