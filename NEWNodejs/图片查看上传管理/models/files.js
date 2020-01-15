/** Created by MiYuXin on 2019/12/27 .  **/
const fs=require("fs");

exports.getalbum=function (callback) {
    fs.readdir("./uploads",function (err,files) {
        //console.log("首页="+files);
        if (err){
            callback("找不到uploads文件夹",null);
            return;
        }
        let isdir=[];
        (function isdirloop(i){
            if (i===files.length){
                callback(null,isdir);
                return;
            }
            fs.stat("./uploads/"+files[i],function (err,stats) {
                if (err){
                    callback("找不到-"+files[i]+"-文件",null);
                    return;
                }
                if (stats.isDirectory()){
                    isdir.push(files[i]);
                }
                isdirloop(i+1);
            });
        })(0);
    });
};

/////////
exports.getimagename=function (albumname,callback) {
    fs.readdir("./uploads/"+albumname,function (err,files) {
        //console.log("文件夹="+files);
        if (err){
            callback("找不到-"+albumname+"-文件夹",null);
            return;
        }
        let allFile=[];
        (function isfileloop(i){
            if (i===files.length){
                callback(null,allFile);
                return;
            }
            fs.stat("./uploads/"+albumname+"/"+files[i],function (err,stats) {
                if (err){
                    callback("找不到-"+files[i]+"-文件",null);
                    return;
                }
                if (stats.isFile()){
                    allFile.push(files[i]);
                }
                isfileloop(i+1);
            });
        })(0);
    });
};











