/** Created by MiYuXin on 2020/1/14 .  **/
var gm=require("gm");
var formidable=require("formidable");
var fs=require("fs");

exports.showindex=function (req,res) {
    //console.log(req.session.touxiang);
    // if (req.session.touxiang){
    //
    // }
    res.render("index",{
        pic:req.session.touxiang||"101.jpg"
    });
};

exports.selecut=function (req,res,next){
    var form=new formidable.IncomingForm();
    form.uploadDir="./uploadimg";

    form.parse(req,function (err,fields,files){
        //console.log(files);
        var oldname=files.touxiang.path;
        var newname="./uploadimg/"+files.touxiang.size+"_"+files.touxiang.name;
        fs.rename(oldname,newname,function (err){
            if (err){
                console.log(err);
            }
            // console.log(files.touxiang.size+"_"+files.touxiang.name);
            req.session.touxiang=files.touxiang.size+"_"+files.touxiang.name;
            res.redirect("/cut");
        });
    });
};

exports.cut=function (req,res){
    //console.log(__dirname);
    //console.log(req.session.touxiang);
    if (!req.session.touxiang){
        res.redirect("/");
        return;
    }
    res.render("cut",{
        avthor:req.session.touxiang
    });
};

exports.docut=function (req,res,next){
    // console.log(req.query);
    // console.log(__dirname);
    var imagetoo=req.query;
    var x=imagetoo.x;
    var y=imagetoo.y;
    var w=imagetoo.w;
    var h=imagetoo.h;
    //console.log(req.session.touxiang);
    gm("./uploadimg/"+req.session.touxiang)
        .crop(w,h,x,y)
        .write("./uploadimg/"+req.session.touxiang,function (err){
            if (err){
                console.log(err);
                res.send("-1");
                return;
            }
            res.send("1");
        });
};
