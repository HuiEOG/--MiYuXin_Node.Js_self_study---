/** Created by MiYuXin on 2020/1/12 . **/
var express=require("express");
var app=express();
var router=require("./router/router.js");
var session=require("express-session");
var http=require("http").Server(app);
var io=require("socket.io")(http);

io.on("connection",function (socket){
    socket.on("chattalk",function (msg){
        io.emit("chattalk",msg);
        return;
    });
});
// 引入session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set("view engine","ejs");
app.use(express.static("public"));
app.use("/uploadimg",express.static("./uploadimg"));
app.use("/userimg",express.static("./userimg"));

app.get("/",router.showindex);
app.get("/reslogin",router.reslogin);
app.post("/regist",router.regist);
app.post("/login",router.login);
app.get("/outlogin",router.outlogin);
app.post("/selecut",router.selecut);
app.get("/selpic",router.selpic);
app.get("/cut",router.cut);
app.post("/docut",router.docut);

//404页面
app.get("/404",router.show404);
app.use(router.turn404);

http.listen(9091);












