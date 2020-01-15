/** Created by MiYuXin on 2020/1/12 . **/
var express=require("express");
var app=express();
var router=require("./router/router.js");

app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",router.showindex);
app.get("/addbook",router.addbook);
app.get("/doaddbook",router.doaddbook);
app.get("/updatebook",router.updatebook);


app.listen(9091);













