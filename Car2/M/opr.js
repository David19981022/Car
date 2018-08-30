var mongoose =require("mongoose");
var oPr=new mongoose.Schema({
    "leibiemingcheng":String,
});

var opr=mongoose.model("opr",oPr);
module.exports=opr;



