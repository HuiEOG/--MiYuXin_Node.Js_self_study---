/** Created by MiYuXin on 2020/1/12 .  **/
var mongoose=require("mongoose");
var bookstore=require("../models/bookstore.js");
// var giuu=new Miyuxin({"name":"miyuxin_03","age":13,"hobby":["打架","呦呦"]});
// giuu.save(function () {
//     console.log("No promber!!");
// });

exports.showindex=function (req,res) {
    bookstore.listallbook(function (err,result) {
        //console.log(result);
        res.render("index",{
            "tushu":result
        });
    });

};

exports.addbook=function (req,res) {
    res.render("addbook");
};

exports.doaddbook=function (req,res) {
    //console.log(req.query);
    bookstore.create(req.query,function (err,result) {
        if (err){
            res.send("添加失败!!");

        }
        res.send("添加成功!!"+result);
    });
};
exports.updatebook=function (req,res) {
    console.log(req.query.bookname);
    bookstore.findbookbyname(req.query.bookname,function (err,result) {
        //console.log(result);
        res.render("updatebook",{
            bookname:result[0].bookname,
            author:result[0].author,
            price:result[0].price
        });
    });

};






