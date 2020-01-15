/** Created by MiYuXin on 2020/1/3 .  **/

const express=require('express');
let app=express();
const db=require('./model/db.js');

app.get("/",function (req,res) {
    db.find("miyuxin",{},function (err,result) {
        if (err){
            res.send(err);
            return;
        }
        res.send(result);
    })
});
//添加
app.get("/insert",function (req,res) {
    db.insertOne("miyuxin",{"name":"阿库娅","vol":{"服饰":"天玄","职业":"召唤"}},function (err,result) {
        if (err){
            res.send("插入失败!!!");
            return;
        }
        res.send("插入成功!!!数据为:--"+result);
    });
});
//查询
app.get("/find",function (req,res) {
    var page=parseInt(req.query.page);
    db.find("miyuxin",{"age":{$gt :19}},{"pagenum":3,"page":page},function (err,result) {
        if (err){
            res.send(err);
            return;
        }
        res.send(result);
        //console.log(result);
    })
});
//删除
app.get("/delete",function (req,res) {
    db.deleteMany("miyuxin",{"name":"冖於忄"},function (err,result) {
        if (err){
            res.send(err);
            return;
        }
        res.send(result);
    })
});
//更新数据
app.get("/update",function (req,res) {
    db.updateMany("miyuxin",{"name":"月青玄"},{$set:{"age":18}},function (err,result) {
        if (err){
            res.send(err);
            return;
        }
        res.send(result);
    })
});

app.listen(9091);










