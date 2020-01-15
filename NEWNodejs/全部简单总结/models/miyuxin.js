/** Created by MiYuXin on 2020/1/14 .  **/
var db=require("../models/db.js");
var mongoose=require("mongoose");

var userSchema=new mongoose.Schema({
    user:String,
    password:String,
    avatar:String
});

userSchema.statics.finduserbyuser=function (user,callback){
    this.model("user").find({user:user},callback);
};
userSchema.methods.updatepic=function (avatar){
    this.avatar=avatar;
    this.save();
    return;
};
var user=db.model("user",userSchema);
// console.log(user);
module.exports=user;






