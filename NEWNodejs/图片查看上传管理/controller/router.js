/** Created by MiYuXin on 2019/12/27 .  **/
const files=require("../models/files.js");
const path=require("path");
const formidable=require('formidable');
const sd = require('silly-datetime');
const fs=require("fs");

exports.showIndex=function (req,res,next) {
    // res.render("index",{
    //     "albums":files.getalbum()

    // });
    // 错误
    files.getalbum(function (err,allablums) {
        if (err){
            next();
            return;
        }
        res.render("index",{
            "albums":allablums
        });
    })
};

exports.showAlbum=function (req,res,next) {
    const albumname = req.params.albumname;
    files.getimagename(albumname,function (err,allimagealbum) {
        if (err){
            next();
            return;
        }
        res.render("album",{
            "albumname":albumname,
            "allimagealbum":allimagealbum
        });
    })
};

exports.showUp=function (req,res,next) {
    files.getalbum(function (err,albumsname) {
        res.render("up",{
            "albums":albumsname
        });
    });
};

exports.putpostup=function(req,res,next){
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+"/../tempup/");

    form.parse(req, function(err, fields, files,next) {
        if (err){
            next();
            return;
        }
        // console.log(fields);
         //console.log(files);
        let rantime=sd.format(new Date(), 'YYYYMMDD')+'_'+parseInt(Math.random()*90+10);
        let extname=path.extname(files.wenfile.name);
        let wendirname=fields.wendir;
        let oldpath=files.wenfile.path;
        let newpath=path.normalize(__dirname+"/../uploads/"+wendirname+"/" +rantime+extname);
        let size=parseInt(files.wenfile.size);
        if (size>1024000){
            res.send(files.wenfile.name+"__文件大于1MB!!");
            // console.log(files);
            // console.log(size);
            fs.unlink(files.wenfile.path,function (err) {
                if (err){
                    throw err;
                    return;
                }
            });
            return;
        }
        fs.rename(oldpath,newpath,function (err) {
            if (err){
                res.send("更名字失败!!");
                return;
            }
            res.send("成功");
        });
        return;
    });
};



//404页面
exports.fales404=function (req,res){
    res.render("404");
};








