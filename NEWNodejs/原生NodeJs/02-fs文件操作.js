/**
 * Created by MiYuXin on 2019/12/12.
 */
const http=require('http');
const fs=require('fs');
//readFile(文件名，回调函数)
// fs.readFile('cvev.txt',function (err,data) {
//     if (err){
//         console.log('读取错误!!!!');
//     }else{
//         console.log(data.toString());
//     }
// });

//writeFile(文件名,内容,回调函数)
// fs.writeFile('cvv.txt','666666',function (err) {
//     console.log(err);
// });
var server=http.createServer(function (req,res) {
    var file_name="./www"+req.url;
    fs.readFile(file_name,function (err,data) {
        if (err){
            res.write('404');
        }else{
            res.write(data);
        }
        res.end();
    });
});

server.listen(9091);









