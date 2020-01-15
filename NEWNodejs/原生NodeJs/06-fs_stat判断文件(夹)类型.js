/** Created by MiYuXin on 2019/12/18 .  **/

//fs.readdir、fs.stat、stats.isDirectory()
var http=require('http');
var fs=require('fs');
var urllib=require('url');

var server=http.createServer(function (req,res) {
    if (req.url=='/favicon.ico'){
        return;
    }

    fs.readdir('./www',function (err,file) {
       var IsDir=[];

       //迭代器强行将异步变为同步--闭包函数自执行在调用--
       (function isdircon(i){
           if (i==file.length){
               //console.log('===='+IsDir);
               return;
           }
           fs.stat('./www/'+file[i],function (err,stats) {
               if (stats.isDirectory()){
                   IsDir.push(file[i]);
               }
               isdircon(i+1);
           });
       })(0);
console.log(IsDir);
    });

});

server.listen(9091);













