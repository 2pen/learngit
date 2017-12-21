module.exports = function(fn,perpage){              //这里的fn很有意思。fn是形参，也是一个函数。在被调用时观察得，fn还有参数，参数还为一个函数，
    //此函数可获得total的值！！！！
    perpage = perpage || 10;
    return function(req,res,next){
        var page=Math.max(
            parseInt(req.param('page')||'1',10),           
            //以上之所以 ||'1'  是因为第一次请求http://localhost:3000/ 时，req.param('page')为undefined  所以要给1！！！！
        1)-1;   //为什么要和1相比取最大？？？
            fn(function(err,total){
                if(err)  return next(err);

                req.page=res.locals.page={
                    number:page,
                    perpage:perpage,
                    from:page*perpage,
                    to:page*perpage + perpage-1,
                    total:total,
                    count:Math.ceil(total/perpage)
                };
                next();
            });
    }
};