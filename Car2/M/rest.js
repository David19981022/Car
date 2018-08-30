var mongoose =require("mongoose");
var Rest=new mongoose.Schema({
    "shichang":Number,
    "dayzujin":Number,
    "kehu":String,
    "qichemingcheng":String,
    "yajin":Number,
    "guanliyuan":String,
    "date":Date,
});

var rest=mongoose.model("rest",Rest);
module.exports=rest;



