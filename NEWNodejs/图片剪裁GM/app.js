/** Created by MiYuXin on 2020/1/14 .  **/

var express=require("express");
var app=express();
var router=require("./router/router.js");
var session = require('express-session');
// 引入session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set("view engine","ejs");
app.use(express.static("./public"));
app.use("/uploadimg",express.static("./uploadimg"));

app.get("/",router.showindex);
app.post("/selecut",router.selecut);
app.get("/cut",router.cut);
app.get("/docut",router.docut);

app.listen(9091);



