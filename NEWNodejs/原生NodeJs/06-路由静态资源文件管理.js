/** Created by MiYuXin on 2019/12/18 .  **/
const http=require('http');
const fs=require('fs');
const url=require('url');
const path=require('path');

http.createServer(function (req,res){
    if (req.url==='/favicon.ico'){
        return;
    }
    let pathname=url.parse(req.url).pathname;
    //默认首页
    if (pathname==='/'){
        pathname='index.html';
    }
    //通过path接口extname拓展名--.html.....
    const extname=path.extname(pathname);
    fs.readFile('./www/'+pathname,function (err, data) {
        if (err){
            // if(extname.indexOf("png") == 1){
            //     getmime(extname,function(mime){
            //         res.writeHead(200,{"Content-Type":mime});
            //         console.log('yyyyyyou='+data);
            //         res.end(data);
            //     });
            //     return;
            // }
            //如果此文件不存在，就应该用404返回
            fs.readFile('./www/404.html',function (err,data) {
                res.writeHead(404,{"Content-type":"text/html;charset=UTF8"});
                res.end(data);
            });
            return;
        }
        // var mime=getmime(extname);
        // console.log('mime+'+mime);
        // //res.writeHead(200,{"Content-type":mime});
        // res.end(data);
        getmime(extname,function(mime){
            res.writeHead(200,{"Content-Type":mime});
            res.end(data);
        });

    });
}).listen(9091);

function getmime(extname,callback) {
    fs.readFile('./www/mime.json',function (err,data) {
        if(err){
            throw Error("找不到mime.json文件！");
            return;
        }
        //console.log(data.toString());
        const exjson=JSON.parse(data);
        //console.log(exjson[extname]);
        const exnna=exjson[extname]|| "text/plain";
        callback(exnna);
    });

    // switch(extname){
    //     case ".html" :
    //         return "text/html";
    //         break;
    //     case ".jpg" :
    //         return "image/jpg";
    //         break;
    //     case ".css":
    //         return "text/css";
    //         break;
    // }
}










