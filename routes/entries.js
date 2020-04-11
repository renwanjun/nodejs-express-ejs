/**
 * 渲染包含表单的模版
 */
const Entry=require('../models/entry')
exports.submit=(req,res,next)=>{
    const data=req.body.entry;
    const user=res.locals.user;
    const username=user?user.name:null;
    const entry=new Entry({
        username:username,
        title:data.title,
        body:data.title
    })
    entry.save((err)=>{
        if(err)return next(err)
        res.redirect('/')
    })

}
exports.form=(req,res)=>{
    res.render('post',{title:'Post'})
}
// 消息列表
exports.list=(req,res,next)=>{
    Entry.getRange(0,-1,(err,entries)=>{
        if(err)return next(err);
        res.render('entries',{
            title:'Entries',
            entries:entries
        })
    })
}