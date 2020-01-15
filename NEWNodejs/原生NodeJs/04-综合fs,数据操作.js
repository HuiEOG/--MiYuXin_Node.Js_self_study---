/**
 * Created by MiYuXin on 2019/12/14.
 */

const http=require('http');
const urllib=require('url');
const fs=require('fs');
const querystring=require('querystring');

var server=http.createServer(function (req,res) {
    //--GET
    var obj=urllib.parse(req.url,true);
    var url=obj.pathname;
    var GET=obj.query;

    //--post
    var str='';
    req.on('data',function (data) {
        //console.log(data);
        str+=data;
    });
    req.on('end',function () {
        var POST=querystring.parse(str);

        if (url!=='/favicon.ico'){

        var UU=JSON.stringify(url),
            GG=JSON.stringify(GET),
            PP=JSON.stringify(POST);
        var datapp=UU+GG+PP;
        console.log(datapp);

        //--FS操作
        var file_name='./www'+url;
        fs.readFile(file_name,function (err,data) {
            //console.log(data);
            if (err){
                res.write('404');
            }else{
                res.write(data);
            }
            res.end();
        });
        fs.writeFile(file_name+'.txt',datapp,function () {
            console.log("写入文件完成!!");
        });
        }
    });//req.on

});

server.listen(9091);











