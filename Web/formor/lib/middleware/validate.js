function parseField(field) {
    return field
        .split(/\[|\]/)               //或者以 [  为分割为数组的依据，或者以 ] 为分割为数组的依据
        .filter(function(s){           //暂时不知道这一步有什么用！？！？！
            return s
        });
}

function getField(req,field){
    var val = req.body;
    field.forEach(function(prop){          //val.entry  为空  val.title才有东西
        val=val[prop];
    });
    return val;
}

exports.required = function(field){
    field = parseField(field);
    return function(req,res,next){
        if(getField(req,field)){
            next();
        }else{
            res.error(field.join(' ')+'is required');
            res.redirect('back');
        }
    }
};

exports.lengthAbove = function(field,len){
    field = parseField(field);
    return function(req,res,next){
    if(getField(req,field).length>len){
        next();
    }else{
        res.error(field.join(' ')+'must have more than '+len+'characters');
        res.redirect('back');
    }
}
        
};