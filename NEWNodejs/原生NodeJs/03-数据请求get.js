/**
 * Created by MiYuXin on 2019/12/13.
 */
const http=require('http');
const querystring=require('querystring');
const urllib=require('url');

http.createServer(function (req,res) {
    //---------------------------------------------split切割方法
    // var GET={};
    // if (req.url.indexOf('?')!=-1){
    //     var arr=req.url.split('?');
    //     var url=arr[0];
    //     var arr2=arr[1].split('&');
    //     for (var i = 0; i < arr2.length; i++) {
    //         var arr3=arr2[i].split('=');
    //         GET[arr3[0]]=arr3[1];
    //     }
    // }else{
    //     var url=req.url;
    // }
    // console.log(url,GET);
    //---------------------------------------------
    if (req.url=='/favicon.ico'){
        return;
    }
    var obj=urllib.parse(req.url,true);
    var url=obj.pathname;
    var GET=obj.query;

    console.log(req.url);
    console.log(obj);
    console.log(url);
    console.log(GET);

    res.write('6666');
    res.end();
}).listen(9091);












