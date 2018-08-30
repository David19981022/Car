var mongoose =require("mongoose");
var cUst=new mongoose.Schema({
    "kehu":String,
    "dianhua":Number,
    "zhuzhi":String,
    "shenfenzheng":Number,
    "jiazhao":String,
});

var client=mongoose.model("client",cUst);
module.exports=client;



