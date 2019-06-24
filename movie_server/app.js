// 使用express构建web服务器
const express=require('express');
const session=require('express-session');
const bodyParser=require('body-parser');
const cors=require('cors');
/* 引入路由模块*/ 
var pool=require("./pool");


// 用cors解决跨域问题
var app=express();
app.use(cors({
    origin:["http://127.0.0.1:8080","http://localhost:8080"],
    credentials:true
}))
var server=app.listen(3000)
// 使用body中间件
app.use(bodyParser.urlencoded({extended:false}));
// 托管静态资源
app.use(express.static('public'));
app.use(session({
    secret:'随机字符串',
    cookie:{maxAge:60*1000*30},//过期时间
    resave:true,
    saveUninitialized:true
}));//将服务器的session，放在req.session中

//接收用户登录请求
app.get("/login",(req,res)=>{
    //接收脚手架参数uname,upwd
    var uname=req.query.uname;
    var upwd=req.query.upwd;
    //sql
    var sql="SELECT id FROM userlist";sql+=" WHERE uname=?";sql+="AND upass=md5(?)";
   // 返回结果
 //{code:1,msg:"登录成功"}
 //{code:-1,msg:"用户名或密码有误"}
 pool.query(sql,[uname,upwd],(err,result)=>{
     if(err)throw err;
     if(result.length==0){
         res.send({
             code:-1,msg:"用户名或密码有误"
         });
     }else{
         req.session.uid=result[0].id
         res.send({code:1,msg:"登录成功"});
     }
 });
});

app.get("/card",(req,res)=>{
    var mlm=req.query.lm;
    var sql="SELECT mname,mimgurl,mcode,mstate,mcontent FROM movielist where mlm=?";
    pool.query(sql,[mlm],(err,result)=>{
        if(err) console.log(err);
        res.write(JSON.stringify(result));
        res.end();
    })
})
app.get("/rank",(req,res)=>{
    var ranklm=req.query.lm;
    var sql="SELECT rankid,rankname,ranklm FROM ranklist where ranklm=?";
    pool.query(sql,[ranklm],(err,result)=>{
        if(err) console.log(err);
        res.write(JSON.stringify(result));
        res.end();
    })
})
app.get("/star",(req,res)=>{
    var smlm=req.query.lm;
    var sql="SELECT smname,smimgurl,smtime FROM star where smlm=?";
    pool.query(sql,[smlm],(err,result)=>{
        if(err) console.log(err);
        res.write(JSON.stringify(result));
        res.end();
    })
})
app.get("/movie",(req,res)=>{
    var m_lm=req.query.lm;
    var sql="SELECT m_name,m_imgurl,m_code,m_content FROM movie where m_lm=?";
    pool.query(sql,[m_lm],(err,result)=>{
        if(err) console.log(err);
        res.write(JSON.stringify(result));
        res.end();
    })
})
// 合并
// 获取楼层6的数据：
app.get('/card6',(req,res)=>{
    var sql="SELECT mid,mname,mimgurl,mcode,mcontent FROM movielist WHERE mlm='floor6'"
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
        //console.log(result);
    })
})
// 获取楼层2的数据
app.get('/card2',(req,res)=>{
    var sql="SELECT mid,mname,mimgurl,mcode,mcontent FROM movielist WHERE mlm='floor2'"
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
        //console.log(result);
    })
})
// 获取二级页面的数据
app.get('/page2',(req,res)=>{
    var sql="SELECT mid,mname,mimgurl,mcode,mcontent FROM movielist WHERE mlm='flpage2'";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})