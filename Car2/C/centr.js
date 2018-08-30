var type = require('../M/type'); //登录
var client = require('../M/cust'); //客户查询
var gh = require("../M/gh");//租赁登记
var opr = require("../M/opr");//类别档案
var Prod = require("../M/Prod");//汽车档案
var rest = require("../M/rest");//归还登记
var formidable = require("formidable");
var url = require("url");
var crypto = require("crypto");

exports.Index = function (req, res) {
    res.render("index")
};
exports.addLogin = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        type.nameZhan(fields.yonghuming, function (err, data) {
            if (!data) {
                res.json({"s": -2})
                return;
            }
            if (crypto.createHmac('sha256', fields.mima).digest('hex') === data.mima) {
                req.session.login = 1;
                req.session.yonghuming = fields.yonghuming;
                res.json({"s": 1})
                return
            } else {
                res.json({"s": -1})
                return
            }
        })
    })
};
// 菜单
exports.menu = function (req, res) {
    if (req.session.login != 1) {
        res.send("请先登录")
        return;
    }
    res.render("menu", {
        "yonghuming": req.session.yonghuming
    })
};
// 客户查询    页面
exports.cust = function (req, res) {
    if (req.session.login != 1) {
        res.send("请先登录")
        return;
    }
    res.render("cust", {
        "yonghuming": req.session.yonghuming,
    })
};
// 获取数据
exports.reade = function (req, res) {
    client.find({},function (err,data) {
        res.json({"result":data})
    })
};
// 增加
exports.addkehu = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        client.find({"kehu": fields.kehu}, function (err, data) {
            if (data.length == 0) {
                var json = new client(fields)
                json.save(function (err) {
                    if (err) {
                        res.json({"s": -1});
                        return;
                    } else {
                        res.json({"s": 1});
                        return;
                    }
                })
            }
            else {
                res.json({"s": -2})
            }
        })
    })
};
//退出
exports.tuichu = function (req, res) {
    var yonghuming = req.session.yonghuming = "";
    if (!yonghuming) {
        res.render("index", {
            "yonghuming": "",
        });
    }
};
// 修改
exports.workDetailed=function (req,res) {
    var id=req.params.id;
    client.findOne({"_id":id},function (err,data) {
        if (err){
            res.json({"s":-1});
            return;
        }
        res.json({"s":data});
    })
};
// 修改提交
exports.update=function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        client.find({"kehu":fields.kehu},function (err,data) {
            if (data.length==0){
                res.json({"s":-1});
            }
            var result=data[0];
            result.kehu=fields.kehu;
            result.dianhua=fields.dianhua;
            result.zhuzhi=fields.zhuzhi;
            result.shenfenzheng=fields.shenfenzheng;
            result.jiazhao=fields.jiazhao;
            result.save(function (err) {
                if (err){
                    res.json({"s":-1})
                    return;
                }
                res.json({"s":1})
            })
        })
    })
};
// 删除
exports.workDelbtn=function (req,res) {
    var id=req.params.id;
    client.find({"_id":id},function (err,results) {
        if(err || results.length == 0){
            res.json({"s" : -1});
            return;
        }
        results[0].remove(function(err){
            if(err){
                res.json({"s" : -1});
                return;
            }
            res.json({"s" : 1});
        });
    })
};
// 汽车类别档案界面
exports.opr = function (req, res) {
    if (req.session.login != 1) {
        res.send("请先登录")
        return;
    }
    res.render("opr", {
        "yonghuming": req.session.yonghuming,
    })
};
// 增加
exports.addleibie=function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        opr.find({"leibiemingcheng": fields.leibiemingcheng}, function (err, data) {
            if (data.length == 0) {
                var json = new opr(fields)
                json.save(function (err) {
                    if (err) {
                        res.json({"s": -1});
                        return;
                    } else {
                        res.json({"s": 1});
                        return;
                    }
                })
            }
            else {
                res.json({"s": -2})
            }
        })
    })
};
// 获取数据
exports.readeLie=function (req,res) {
    opr.find({},function (err,data) {
        res.json({"result":data})
    })
};
//修改
exports.DetailedLei=function (req,res) {
    var id=req.params.id;
    opr.findOne({"_id":id},function (err,data) {
        if (err){
            res.json({"s":-1});
            return;
        }
        res.json({"s":data});
    })
};
//修改提交
exports.updateLei=function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        opr.find({"_id":fields.id},function (err,data) {
            if (data.length==0){
                res.json({"s":-1});
            }
            var result=data[0];
            result.leibiemingcheng=fields.leibiemingcheng;
            result.save(function (err) {
                if (err){
                    res.json({"s":-1})
                    return;
                }
                res.json({"s":1})
            })
        })
    })
};
//删除
exports.DelbtnLei=function (req,res) {
    var id=req.params.id;
    opr.find({"_id":id},function (err,results) {
        if(err || results.length == 0){
            res.json({"s" : -1});
            return;
        }
        results[0].remove(function(err){
            if(err){
                res.json({"s" : -1});
                return;
            }
            res.json({"s" : 1});
        });
    })
};
// 租赁登记 ------------------------------------
exports.gh=function (req,res) {
    if (req.session.login != 1) {
        res.send("请先登录")
        return;
    }
    res.render("gh", {
        "yonghuming": req.session.yonghuming,
    })
};
// 获取数据
exports.readgh=function (req,res) {
    opr.find({},function (err,data) {
        res.json({"s":data})
    })
};
//选项卡
exports.tabgh=function (req,res) {
    var id=req.params.id;
    Prod.find({"suoshuleixing":id},function (err,data) {
        res.json({"s":data})
    })
};
// 获取用户
exports.readYonghu=function(req,res){
    client.find({},function (err,data) {
        res.json({"s":data})
    })
};
//确认租车
exports.zuchuAdd=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        gh.create({
            "shichang" : fields.shichang ,
            "dayzujin" : fields.dayzujin ,
            "zong" : fields.zong ,
            "kehu" : fields.kehu,
            "qichemingcheng":fields.qichemingcheng,
            "yajin":fields.yajin,
            "zhifu":fields.zhifu,
            "guanliyuan":fields.guanliyuan,
            "date":new Date()
        },function(err,data){
            if (err) {
                res.json({"s": -1});
                return;
            } else {
                res.json({"s": 1});
                return;
            }
        });
    })
};
// 修改出租状态
exports.updateChuzu=function(req,res){
    var id=req.params.id;
    Prod.find({"_id":id},function (err,data) {
        var result=data[0];
        result.qichemingcheng=result.qichemingcheng;
        result.suoshuleixing=result.suoshuleixing;
        result.jiage=result.jiage;
        result.day=result.day;
        result.zhuangtai=1;
        result.save(function (err) {
            if (err){
                res.json({"s":-1})
                return;
            }
            res.json({"s":1})
        })
    })
};
//汽车档案 ------------------------------------------
//  页面
exports.Prod = function (req, res) {
    if (req.session.login != 1) {
        res.send("请先登录")
        return;
    }
    res.render("Prod", {
        "yonghuming": req.session.yonghuming,
    })
};
//增加
exports.Prodadd=function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        Prod.find({"qichemingcheng": fields.qichemingcheng}, function (err, data) {
            if (data.length == 0) {
                Prod.create({
                    "qichemingcheng" : fields.qichemingcheng ,
                    "suoshuleixing" : fields.suoshuleixing ,
                    "jiage" : fields.jiage ,
                    "day" : fields.day,
                    "zhuangtai":0,
                },function(err,data){
                    if (err) {
                        res.json({"s": -1});
                        return;
                    } else {
                        res.json({"s": 1});
                        return;
                    }
                });
            }
            else {
                res.json({"s": -2})
            }
        })
    })
};
// 获取数据
exports.readProd=function (req,res) {
    Prod.find({},function (err,data) {
        res.json({"s":data})
    })
};
//修改
exports.ProdDetailed=function (req,res) {
    var id=req.params.id;
    Prod.findOne({"_id":id},function (err,data) {
        if (err){
            res.json({"s":-1});
            return;
        }
        res.json({"s":data});
    })
};
//修改提交
exports.updateProd=function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        Prod.find({"suoshuleixing":fields.suoshuleixing},function (err,data) {
            if (data.length==0){
                res.json({"s":-1});
            }
            var result=data[0];
            result.qichemingcheng=fields.qichemingcheng;
            result.suoshuleixing=fields.suoshuleixing;
            result.jiage=fields.jiage;
            result.day=fields.day;
            result.save(function (err) {
                if (err){
                    res.json({"s":-1})
                    return;
                }
                res.json({"s":1})
            })
        })
    })
};
//删除
exports.DelbtnProd=function (req,res) {
    var id=req.params.id;
    Prod.find({"_id":id},function (err,results) {
        if(err || results.length == 0){
            res.json({"s" : -1});
            return;
        }
        results[0].remove(function(err){
            if(err){
                res.json({"s" : -1});
                return;
            }
            res.json({"s" : 1});
        });
    })
};
// 归还登记  --------------------------
//页面
exports.rest=function (req,res) {
    if (req.session.login != 1) {
        res.send("请先登录")
        return;
    }
    res.render("rest", {
        "yonghuming": req.session.yonghuming,
    })
};
//获取数据
exports.readrest=function (req,res) {
    gh.find({},function (err,data) {
        res.json({"s":data})
    })
};
//记录退换
exports.restAdd=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        rest.create({
            "shichang" : fields.shichang ,
            "dayzujin" : fields.dayzujin ,
            "kehu" : fields.kehu,
            "qichemingcheng":fields.qichemingcheng,
            "yajin":fields.yajin,
            "guanliyuan":fields.guanliyuan,
            "date":new Date()
        },function(err,data){
            if (err) {
                res.json({"s": -1});
                return;
            } else {
                res.json({"s": 1});
                return;
            }
        });
    })
};
//归还后，修改出租的车
exports.updateguihuan=function(req,res){
    var id=req.params.id;
    gh.find({"_id":id},function (err,results) {
        if(err || results.length == 0){
            res.json({"s" : -1});
            return;
        }
        results[0].remove(function(err){
            if(err){
                res.json({"s" : -1});
                return;
            }
            res.json({"s" : 1});
        });
    })
};
//归还后，修改车状态
exports.updateguihuans=function(req,res){
    var che=req.params.id;
    Prod.find({"qichemingcheng":che},function (err,data) {
        var result=data[0];
        result.qichemingcheng=result.qichemingcheng;
        result.suoshuleixing=result.suoshuleixing;
        result.jiage=result.jiage;
        result.day=result.day;
        result.zhuangtai=0;
        result.save(function (err) {
            if (err){
                res.json({"s":-1})
                return;
            }
            res.json({"s":1})
        })
    })
};
//统计分析---------------------------
//页面
exports.Sale=function (req,res) {
    if (req.session.login != 1) {
        res.send("请先登录")
        return;
    }
    res.render("Sale", {
        "yonghuming": req.session.yonghuming,
    })
};
//获取租出数据
exports.readSale=function (req,res) {
    gh.find({},function (err,data) {
        res.json({"s":data})
    })
};
//获取退换数据
exports.readSales=function (req,res) {
    rest.find({},function (err,data) {
        res.json({"s":data})
    })
};
//获取租车的
exports.readChu=function (req,res) {
    gh.find({},function (err,data) {
        res.json({"s":data})
    })
};
//获取归还的
exports.readHuan=function (req,res) {
    rest.find({},function (err,data) {
        res.json({"s":data})
    })
};