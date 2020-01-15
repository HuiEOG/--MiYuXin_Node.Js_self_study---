/** Created by MiYuXin on 2020/1/3 .  **/
const MongoClient=require("mongodb").MongoClient;
const settings=require("../settings.js");

function _connect(callback) {
    const url = settings.duurl;
    // Use connect method to connect to the Server
    //{ useNewUrlParser: true, useUnifiedTopology: true }
    MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client) {
        if (err){
            callback(err,null,null);
            client.close();
            return;
        }
        let db=client.db("hui");
        callback(err,db,client);
    });
}

//插入数据
exports.insertOne=function (collectname,json,callback) {
    _connect(function (err,db,client) {
        if (err){
            res.send("连接数据库失败!!");
            return;
        }
        db.collection(collectname).insertOne(json,function (err,result) {
            callback(err,result);
            client.close();
        })
    });
};

//查询以及分页查询
exports.find=function (collectname,json,funck_1,funck_2) {
    var result=[];

    if (arguments.length===3){
        var callback=funck_1;
        var limit=0;
        var shipnum=0;
    }else if (arguments.length===4){
        var pagearg=funck_1;
        var callback=funck_2;
        var limit=pagearg.pagenum||0;
        var shipnum=pagearg.pagenum*pagearg.page||0;
        var sort=pagearg.sort||{};
    }else{
        throw new Error("find函数接收3个或者4个参数!!");
        return;
    }
    _connect(function (err,db,client) {
        //console.log(shipnum);
        var cursor=db.collection(collectname).find(json).skip(shipnum).limit(limit).sort(sort);
        cursor.each(function (err,doc) {
            if (err){
                callback(err,null);
                client.close();
                return;
            }
            if (doc!==null){
                result.push(doc);
            }else{
                callback(null,result);
                client.close();
            }
        });
    });
};

//删除数据
exports.deleteMany=function (collectname,json,callback) {
    _connect(function (err,db,client) {
        db.collection(collectname).deleteMany(json,function (err,result) {
            callback(err,result);
            client.close();
        })
    });
};

//更改数据
exports.updateMany=function (collectname,json_1,json_2,callback) {
    _connect(function (err,db,client) {
        db.collection(collectname).updateMany(json_1,json_2,function (err,result) {
            callback(err,result);
            client.close();
        })
    });
};

exports.getallcount=function (collectname,callback) {
    _connect(function (err,db,client) {
        db.collection(collectname).find().count(true,function (err,result) {
            callback(result);
        });
        client.close();
    });
};