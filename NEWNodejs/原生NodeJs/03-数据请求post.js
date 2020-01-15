/**
 * Created by MiYuXin on 2019/12/13.
 */
const http=require('http');
const querystring=require('querystring');

http.createServer(function (req, res){
    //POST——req

    var str='';   //接收数据

    //data——有一段数据到达(很多次)
    var i=0;
    req.addListener('data',function (data) {
        console.log(`第${i++}次收到数据`);
        str+=data;
    });
    req.addListener('end',function () {
        var poststring=str.toString();
        console.log('poststring=='+poststring);
        var postobj=querystring.parse(poststring);
        console.log(postobj);
        res.end('sucess');
    // req.on('data', function (data){
    //     console.log(`第${i++}次收到数据`);
    //     str+=data;
    // });
    //end——数据全部到达(一次)
    // req.on('end', function (){
    //     var POST=querystring.parse(str);
    //     console.log(POST);
    // });

    });
}).listen(9091);










