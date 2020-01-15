/** Created by MiYuXin on 2019/12/25 .  **/

const express=require('express');
const app=express();

app.get("/",express.static('/www'));

app.listen(9091);












