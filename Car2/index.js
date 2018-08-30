var express = require("express");
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Car');
var app = express();
//设置views
app.set("view engine","ejs");

//使用session中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
var center=require("./C/centr")
//静态页面
app.use(express.static("static"));
// 登录
app.get("/",center.Index);
app.post("/addLogin",center.addLogin);
// 菜单
app.get("/menu",center.menu);
// 客户查询
app.get("/cust",center.cust);//页面
app.get("/reade",center.reade);// 获取数据
app.post("/addkehu",center.addkehu);//增加
app.get("/workDetailed/:id",center.workDetailed);//修改
app.post("/update",center.update);//修改提交
app.get("/workDelbtn/:id",center.workDelbtn);//删除
// 汽车类别档案界面
app.get("/opr",center.opr);//页面
app.post("/addleibie",center.addleibie);//增加
app.get("/readeLie",center.readeLie);// 获取数据   //获取车类
app.get("/DetailedLei/:id",center.DetailedLei);//修改
app.post("/updateLei",center.updateLei);//修改提交
app.get("/DelbtnLei/:id",center.DelbtnLei);//删除
// 租赁登记
app.get("/gh",center.gh);//页面
app.get("/readgh",center.readgh);// 获取数据
app.get("/tabgh/:id",center.tabgh);//选项卡
app.get("/readYonghu",center.readYonghu);// 获取用户
app.post("/zuchuAdd",center.zuchuAdd);//确认租车
app.get("/updateChuzu/:id",center.updateChuzu);//修改出租状态
// 汽车档案
app.get("/Prod",center.Prod);//页面
app.post("/Prodadd",center.Prodadd);//增加
app.get("/readProd",center.readProd);// 获取数据
app.get("/ProdDetailed/:id",center.ProdDetailed);//修改
app.post("/updateProd",center.updateProd);//修改提交
app.get("/DelbtnProd/:id",center.DelbtnProd);//删除
// 归还登记
app.get("/rest",center.rest);//页面
app.get("/readrest",center.readrest);//获取数据
app.post('/restAdd',center.restAdd);//记录退换
app.get("/updateguihuan/:id",center.updateguihuan);//归还后，修改已出租的车
app.get("/updateguihuans/:id",center.updateguihuans);//归还后，修改车状态
//统计分析
app.get("/Sale",center.Sale);//页面
app.get("/readSale",center.readSale);//获取租出数据
app.get("/readSales",center.readSales);//获取退换数据
app.get("/readChu",center.readChu);//获取租车的
app.get("/readHuan",center.readHuan);//获取归还的
// 退出
app.get("/tuichu",center.tuichu);
app.listen(3000);