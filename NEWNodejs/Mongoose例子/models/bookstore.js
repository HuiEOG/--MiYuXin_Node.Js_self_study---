/** Created by MiYuXin on 2020/1/12 .  **/
var mongoose=require("mongoose");
var db=require("./db.js");

var bookSchema=new mongoose.Schema({
    "bookname":String,
    "author":String,
    "price":String
    // ,
    // "type":Array
});
bookSchema.statics.listallbook=function (callback) {
    this.model("book").find({},callback);
};
bookSchema.statics.findbookbyname=function (name,callback) {
    this.model("book").find({bookname:name},callback);
};
var bookModel=db.model("book",bookSchema);
module.exports=bookModel;


bookModel.find({"author":"冖於忄"},function (err,result) {
    // console.log(result);
    var jquery=result[0];
    jquery.author="雪嘤";
    jquery.save();

    // var kop=result[3];
    // kop.bookname="lol经典";
    // kop.author="拳头";
    // kop.price="66";
    // kop.save();

    console.log(result[0]);
    console.log("====================================");
    console.log(result);
});






