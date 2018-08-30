var mongoose =require("mongoose");
var Gh=new mongoose.Schema({
    "shichang":Number,
    "dayzujin":Number,
    "zong":Number,
    "kehu":String,
    "zhifu":Number,
    "qichemingcheng":String,
    "yajin":Number,
    "guanliyuan":String,
    "date":Date,
});

var gh=mongoose.model("gh",Gh);
module.exports=gh;



