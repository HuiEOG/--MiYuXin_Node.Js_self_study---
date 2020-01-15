/** Created by MiYuXin on 2020/1/12 .  **/
var mongoose=require("mongoose");
var gm=require("gm");
var formidable=require("formidable");
var fs=require("fs");
var user=require("../models/miyuxin.js");
var path=require("path");
var MD5=require("../models/MD5.js");


//首页
exports.showindex=function (req,res,next){
    if ( req.session.login!=="login"){
        res.redirect("reslogin");
        return;
    }
    user.finduserbyuser(req.session.user,function (err,result){
        //console.log(result);
        if (err){
            console.log(err);
            return;
        }
        var avatar=result[0].avatar||"default.jpg";
        req.session.avatar=avatar;
        res.render("index",{
            user:req.session.user,
            avatar:avatar
        });
    });
};

//转到404
exports.turn404=function (req,res,next){
    res.redirect("/404");
};

//404页面
exports.show404=function (req,res,next){
    res.render("404");
};

//注册登录界面
exports.reslogin=function (req,res,next){
    res.render("reslogin");
};

//注册
exports.regist=function (req,res,next){
    // if ( req.session.login!=="login"){
    //     res.render("reslogin");
    //     return;
    // }
    var form=new formidable.IncomingForm();
    form.parse(req,function (err,fields,files){
        // console.log(fields);
        var ruser=fields.user.toString();
        var rpassword=MD5(fields.password.toString());
        user.finduserbyuser(ruser,function (err,result){
             // console.log(result);
             // console.log(typeof ruser);
             // console.log(rpassword);
           if (err){
               res.json({"stats":"-1","msg":"不知名错误,注册失败!!"});
               return;
           }else if (result.length!==0){
               res.json({"stats":"-2","msg":"用户名已被注册,请重新注册!!"});
               return;
           }
            user.create({
                "user":ruser,
                "password":rpassword,
                "avatar":"default.jpg"
            },function (err,result){
                if (err){
                    // console.log("注册失败");
                    res.json({"stats":"-1","msg":"不知名错误,注册失败!!"});
                    return;
                }
                res.json({"stats":"1","msg":"成功注册!!"});
                return;
            });
        });
    });
};

//登录
exports.login=function (req,res,next){
    // if ( req.session.login!=="login"){
    //     res.render("reslogin");
    //     return;
    // }
    var form=new formidable.IncomingForm();
    form.parse(req,function (err,fields,files){
        var luser=fields.user.toString();
        var lpassword=MD5(fields.password.toString());
        user.finduserbyuser(luser,function (err,result){
             // console.log(result);
             // console.log(lpassword);
            if (err){
                res.json({"stats":"-1","msg":"不知名错误,登录失败!!"});
                return;
            }else if (result.length===0){
                res.json({"stats":"-2","msg":"没有这个用户,登录失败!!"});
                return;
            }else if (result[0].password!==lpassword){
                res.json({"stats":"-3","msg":"密码错误,登录失败!!"});
                return;
            }else{
                req.session.login="login";
                req.session.user=luser;
                res.json({"stats":"1","msg":"登录成功!!"});
                return;
            }

        })
    });
};

//退出登录
exports.outlogin=function (req,res,next){
    req.session.login="outlogin";
    //console.log(req.session.user);
    var path="./uploadimg/"+req.session.user+".jpg";
    fs.unlink(path,function (err){
        if (err){
            //console.log(err);
            res.redirect("/reslogin");
            return;
        }
        res.redirect("/reslogin");
    });

};

//转到selpic界面
exports.selpic=function (req,res,next){
    if ( req.session.login!=="login"){
        res.redirect("reslogin");
        return;
    }
    res.render("selpic",{
        pic:req.session.avatar||"default.jpg"
    });
};

//选择图片处理
exports.selecut=function (req,res,next){
    var form=new formidable.IncomingForm();
    form.uploadDir="./uploadimg";

    form.parse(req,function (err,fields,files){
        // console.log(files);
        // var extname=path.extname(files.touxiang.name);
        // // console.log(extname);
        var oldname=files.touxiang.path;
        var newname="./uploadimg/"+req.session.user+".jpg";
        fs.rename(oldname,newname,function (err){
            if (err){
                console.log(err);
            }
            // console.log(files.touxiang.size+"_"+files.touxiang.name);
            req.session.avatarcut=req.session.user+".jpg";
            res.redirect("/cut");
        });
    });
};

//剪裁头像界面
exports.cut=function (req,res,next){
    //console.log(__dirname);
    //console.log(req.session.avatar);
    if ( req.session.login!=="login"){
        res.redirect("reslogin");
        return;
    }else if (!req.session.avatarcut){
        res.redirect("/");
        return;
    }
    res.render("cut",{
        avthor:req.session.avatarcut
    });
};

//执行剪裁
exports.docut=function (req,res,next){
    // console.log(req.query);
    // console.log(__dirname);
    if ( req.session.login!=="login"){
        res.redirect("reslogin");
        return;
    }

    var form=new formidable.IncomingForm();
    form.parse(req,function (err,fields,files){
        // console.log(fields);
        var x=fields.x;
        var y=fields.y;
        var w=fields.w;
        var h=fields.h;
        //console.log(req.session.avatar);
        gm("./uploadimg/"+req.session.avatarcut)
            .crop(w,h,x,y)
            .write("./userimg/"+req.session.avatarcut,function (err){
                if (err){
                    console.log(err);
                    res.send("-1");
                    return;
                }
                user.find({user:req.session.user},function (err,result){
                    if (err){
                        console.log(err);
                        return;
                    }
                    var user=result[0];
                    user.updatepic(req.session.avatarcut);
                    res.send("1");
                    return;
                });
            });
    });
};

//socket广播















