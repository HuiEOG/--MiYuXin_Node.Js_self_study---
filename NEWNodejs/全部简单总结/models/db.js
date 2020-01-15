/** Created by MiYuXin on 2020/1/14 .  **/
//连接数据库
var mongoose=require("mongoose");
var db=mongoose.createConnection("mongodb://localhost/miyuxin",{ useNewUrlParser: true, useUnifiedTopology: true });
db.once("open",function (err){
    if (err){
        console.log("连接数据库失败!!");
    }
    console.log("数据库连接成功!!");
});
module.exports=db;







