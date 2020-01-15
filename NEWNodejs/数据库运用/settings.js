/** Created by MiYuXin on 2020/1/4 .  **/
var dd=new Date();
var y=dd.getFullYear();
var mont=dd.getMonth()+1;
var date=dd.getDate();
var h=dd.getHours();
var m=dd.getMinutes();
var s=dd.getSeconds();
var nowtimes=y+"_"+mont+"_"+date+"_"+h+"_"+m+"_"+s;
module.exports={
    "duurl":"mongodb://localhost:27017/hui",
    "timesj":nowtimes
};












