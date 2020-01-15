/** Created by MiYuXin on 2019/12/23 .  **/

const fs=require('fs');
const url=require('url');
const path=require('path');
const formidable=require('formidable');
const util = require("util");
const sd = require('silly-datetime');
const express=require('express');
const bodyParser=require('body-parser');
const router=require("./controller");
let app=express();

// app.use( function(req, res, next) {
//     if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
//         return res.sendStatus(204);
//     }
//     return next();
// });
app.set("view engine","ejs");
app.use(express.static('./public'));
app.use(express.static('./uploads'));
app.get("/",router.showIndex);
app.get("/:albumname",router.showAlbum);
app.get("/up",router.showUp);
app.post("/up",router.putpostup);
//404
app.use(router.fales404);
app.listen(9091);






