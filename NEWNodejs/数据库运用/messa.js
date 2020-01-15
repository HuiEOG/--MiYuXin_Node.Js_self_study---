/** Created by MiYuXin on 2020/1/3 .  **/

const express=require('express');
let app=express();
const db=require('./model/db.js');
const formidable=require("formidable");
const settings=require("./settings.js");
const ObjectID=require("mongodb").ObjectID;
var session = require('express-session');

// 引入session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));



//引入模板并路由文件夹
app.set("view engine","ejs");
app.use(express.static("./public"));

//主页请求数据初始化
app.get("/",function (req,res,next) {
    if (req.session.login==="1"){
        //console.log(req.session.username);
        db.getallcount("liuyanben",function (result) {
            // console.log(result);
            var truelogin="欢迎" + req.session.username;
            res.render("index",{
                "count":Math.ceil(result / 5),
                truelogin:truelogin
            });
        });
    }else{
        //console.log(req.session.login);
        res.render("login");
    }

});

//登录Login
app.get("/login",function (req,res) {
    res.render("login");
});
app.get("/checklogin",function (req,res) {
    var userinput=req.query.username;
    var passwordinput=req.query.password;
    db.find("user",{"username":userinput},function (err,result) {
        var truelogin="";
        if (result.length===0){
            truelogin="没有这个用户,请正确输入用户名!!";
            res.render("checklogin",{
                stats:"233",
                truelogin:truelogin
            });
            return;
        }
        var datapassword=result[0].password;
        if (passwordinput===datapassword){
            req.session.login="1";
            req.session.username=result[0].username;

            truelogin="登录成功!!  欢迎" + req.session.username;
            res.render("checklogin",{
                stats:"666",
                truelogin:truelogin
            });
            //res.send("登录成功!!"+"欢迎"+req.session.username);
        }else{
            truelogin="登录失败!!密码错误!!请重新登录!!";
            res.render("checklogin",{
                stats:"777",
                truelogin:truelogin
            });
        }
    })
});

//读取数据
app.get("/du",function (req,res) {
    var pagenum=5;
    var page=parseInt(req.query.page);
    db.find("liuyanben",{},{"sort":{"_id":-1},"pagenum":pagenum,"page":page},function (err,result) {
        res.json({"result":result});
    })
});

//提交
app.post("/tijiao",function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        // console.log(fields.xingming+"|||"+fields.liuyan);
        //写入数据库
        db.insertOne("liuyanben",{
            "xingming":fields.xingming,
            "liuyan":fields.liuyan,
            "timesj":settings.timesj
        },function (err,result) {
           // console.log(result.insertedId);
            if (err){
                res.json("-1");
                return;
            }
            res.json({stats:"1",id:result.insertedId});
        })
    });
});

//删除
app.get("/shanchu",function (req,res) {
    var id=req.query.id;
    db.deleteMany("liuyanben",{"_id":ObjectID(id)},function (err,result) {
        res.redirect("/");
    })
});

// app.get("/coo",function (req,res) {
//     db.getallcount("liuyanben",function (result) {
//         console.log(result);
//     });
// });

app.listen(9091);










