var mongoose =require("mongoose");
var PorD=new mongoose.Schema({
    "qichemingcheng":String,
    "suoshuleixing":String,
    "jiage":Number,
    "day":Number,
    "zhuangtai":Number,
});

var Prod=mongoose.model("Prod",PorD);
module.exports=Prod;



