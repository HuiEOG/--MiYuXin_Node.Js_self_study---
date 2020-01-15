/** Created by MiYuXin on ${DATE} .  **/

let http=require('http');
let fs=require('fs');
let querystring=require('querystring');
let urllib=require('url');
var user={};

var server=http.createServer(function (req,res) {

    var str='';
    req.on('data',function (data) {
        str+=data;
    });
    req.on('end',function () {
        var obj=urllib.parse(req.url,true);
        const url=obj.pathname;
        const GET=obj.query;
        const POST=querystring.parse(str);

        if (url=='/user'){
            switch (GET.act){
                case 'reg':
                    //注册判断是否存在用户
                    if (user[GET.user]){
                        res.write('{"ok":false,"msg":"此用户已经注册!!"}');
                    }else{
                        user[GET.user]=GET.pass;
                        res.write('{"ok":true,"msg":"注册成功!!"}');
                    }
                    break;
                case 'login':
                    //登录判断是否存在用户
                    if (user[GET.user]==null){
                        res.write('{"ok":false,"msg":"没有此用户!!"}');
                    }else if(user[GET.user]){
                        if (user[GET.pass]!==GET.pass){
                            res.write('{"ok":false,"msg":"密码错误!!"}');
                        }else{
                            res.write('{"ok":true,"msg":"登录成功!!"}');
                        }
                    }
                    break;
                default:
                    res.write('{"ok":false,"msg":"未知Act!!"}');
                    break;
            }
            res.end();
        }else{
            var file_name='./www'+url;
            fs.readFile(file_name,function (err,data) {
                if (err){
                    res.write(url);
                }else{
                    res.write(data);
                }
                res.end();
            });//fs.readFile
        }




    });
    
});
server.listen(9091);
 
 
 