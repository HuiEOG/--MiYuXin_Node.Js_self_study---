/**
 * Created by MiYuXin on 2019/12/12.
 */
const http=require('http');
const fs=require('fs');
//创建一个服务器请求函数，有人进来时执行
var server=http.createServer(function (req,res) {
    //console.log('WDNMD,进来个屁！！滚！！');
    switch (req.url){
        case '/index.html':
            res.write("主页！！");
            break;
        case '/game.html':
            res.write('游戏界面!!');
            break;
        default :
            res.write('404!!');
            break;
    }
    //res.write('WDNMD,进来个屁！！滚！！');
    res.end();
});

 //监听
server.listen(9091);











