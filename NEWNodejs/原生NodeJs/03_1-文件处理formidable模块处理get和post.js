/** Created by MiYuXin on 2019/12/19 .  **/

const http=require('http');
const querystring=require('querystring');
const formidable=require('formidable');

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
            console.log(fields);
            console.log(files);
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('成功!!!');
        });

        return;
    }



}).listen(9091);











