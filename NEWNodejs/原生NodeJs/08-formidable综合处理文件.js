/** Created by MiYuXin on 2019/12/19 .  **/

const http=require('http');
const querystring=require('querystring');
const formidable=require('formidable');
var fs=require('fs');
var util = require("util");
var path=require('path');
var sd = require('silly-datetime');

http.createServer(function (req, res){
    //console.log(req.url);
    if (req.url=='/favicon.ico'){
        return;
    }
    if (req.url == '/02post' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir = "./uploads";
        form.parse(req, function(err, fields, files) {
            if (err){
                throw err;
            }
            //console.log(fields);
            //console.log(files);
            console.log(util.inspect({fields:fields,files:files}));
            var rantime=sd.format(new Date(), 'YYYYMMDD')+'_'+parseInt(Math.random()*90+10);
            //console.log(rantime);
            var extname=path.extname(files.file.name);
            var oldpath=__dirname+'/'+files.file.path;
            var newpath=__dirname+'/uploads/'+rantime+extname;
            fs.rename(oldpath,newpath,function (err) {
                if (err){
                    throw err;
                }
                res.writeHead(200, {'content-type': 'text/plain'});
                console.log('修改名字成功!!');
                res.end('成功!!!');
            });

        });

        return;
    }



}).listen(9091);











