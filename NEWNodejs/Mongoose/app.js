/** Created by MiYuXin on 2020/1/12 . **/
var mongoose=require("mongoose");
var Miyuxin=require("./models/Miyuxin.js");

var giuu=new Miyuxin({"name":"miyuxin_03","age":13,"hobby":["打架","呦呦"]});
giuu.save(function () {
    console.log("No promber!!");
});













