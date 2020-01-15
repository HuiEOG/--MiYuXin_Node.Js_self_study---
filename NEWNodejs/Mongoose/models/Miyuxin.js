/** Created by MiYuXin on 2020/1/12 .  **/
var mongoose=require("mongoose");
var db=require("./db.js");

var miyuxinSchema=new mongoose.Schema({
    "name":String,
    "age":Number,
    "hobby":Array
});
var miyuxin=db.model("user",miyuxinSchema);

module.exports=miyuxin;









