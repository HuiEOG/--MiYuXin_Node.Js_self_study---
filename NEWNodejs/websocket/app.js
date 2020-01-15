/** Created by MiYuXin on 2020/1/13 .  **/
var http=require("http");
var fs=require("fs");

var server=http.createServer(function (req,res) {
     //console.log(req.url);
    if (req.url==="/favicon.ico"){
        return;
    }
    if (req.url==="/"){
        fs.readFile("./index.html",function (err,data) {
            res.end(data);
        });
    }
});
var io=require("socket.io")(server);
console.log(io);
io.on("connection",function (socket) {
    console.log("有一个客户端连接了!!");
    socket.on("emitto",function (msg) {
        io.emit("onin",msg);
    });
});
server.listen(9091);












