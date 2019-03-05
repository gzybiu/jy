const express=require("express");
const pool=require("./pool");
const cors=require("cors");
const fs=require("fs");
const multer=require("multer");
// 创建上传文件对象
var upload=multer({dest:"upload/"})
//用于保存用户uid
const session=require("express-session")
var app=express();
app.use(express.static("public"));
app.listen(3000)
app.use(cors({
  origin:["http://127.0.0.1:3001","http://localhost:3001"],//允许跨域访问的列表
  credentials:true //是否验证，必须加上才可以使用session
}))
//配置模块
app.use(session({
 
  }
}))
//功能1：首页中的轮播图
app.get("/getImg",(req,res)=>{
  var rows=[
    {id:1,img_url:"http://127.0.0.1:3000/imgs/banners/banner1.jpg"},
    {id:2,img_url:"http://127.0.0.1:3000/imgs/banners/banner2.jpg"},
    {id:3,img_url:"http://127.0.0.1:3000/imgs/banners/banner3.jpg"},
    {id:4,img_url:"http://127.0.0.1:3000/imgs/banners/banner4.jpg"}
  ];
  res.send(rows)
})
//功能2：首页中的三张图
app.get("/getIndexList",(req,res)=>{
  var rows=[
    {id:1,img_url:"http://127.0.0.1:3000/imgs/index/haixian.png"},
    {id:2,img_url:"http://127.0.0.1:3000/imgs/index/jiancan.png"},
    {id:3,img_url:"http://127.0.0.1:3000/imgs/index/yuyue.png"},
  ];
  res.send(rows)
})
//功能3：首页商品
app.get("/getIndexproduct",(req,res)=>{
  var rows={ haixian:[
	{pid:10,img_url:"http://127.0.0.1:3000/imgs/products/suan.jpg",title:"蒜蓉波士顿龙虾",price:198},
    {pid:11,img_url:"http://127.0.0.1:3000/imgs/products/longxia.jpg",title:"炭烤波士顿龙虾",price:198},
    {pid:12,img_url:"http://127.0.0.1:3000/imgs/products/xie.jpg",title:"阿拉斯加帝王蟹",price:298},
	{pid:13,img_url:"http://127.0.0.1:3000/imgs/products/gui.jpg",title:"松鼠桂鱼",price:168}],
	  jiancan:[
	{pid:14,img_url:"http://127.0.0.1:3000/imgs/products/jufan.jpg",title:"培根焗饭",price:35},
    {pid:15,img_url:"http://127.0.0.1:3000/imgs/products/zhou.jpg",title:"波士顿龙虾粥",price:198}	  
  ]
    ,
  };
  res.send(rows)
})
//功能4： 查询评价信息
app.get("/getProductComment",(req,res)=>{
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  // var nid=req.query.nid;
  //1.2：默认值
  if(!pno){pno=1}
  if(!pageSize){pageSize=7}
  //2:验证正则表达式
  var reg=/^\d{1,}$/
  if(!reg.test(pno)){res.send({code:-1,msg:"页码格式不正确"})}
  if(!reg.test(pageSize)){res.send({code:-2,msg:"页大小格式不正确"})}
  //3:创建sql
  var progress=0;
  obj={code:1};
  var sql="SELECT count(cid) as c FROM user_comments"
  pool.query(sql,(err,result)=>{
    if(err) throw err;
   // console.log(result[0].c)
    var pageCount = Math.ceil(result[0].c/pageSize);
      obj.pageCount = pageCount;
      progress += 50;
      if(progress == 100){
      res.send(obj);
      }
  })
  var sql="SELECT cid,uname,user_img,utime,score,content,contentPic FROM user_comments  ORDER BY utime DESC LIMIT ?,?  "
  var offset=parseInt((pno-1)*pageSize);
  pageSize=parseInt(pageSize)
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err) throw  err;
    //console.log(result)
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  })
})

//功能5： 获取所有商品信息
app.get("/getProducts",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 4;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(pid) as c FROM jy_product";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT pid,title,detail,price,saleNumber,img_url,family";
    sql +=" FROM jy_product";
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
});
//功能5.1： 查询海鲜商品
app.get("/getHai",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 4;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(pid) as c FROM jy_product";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT pid,title,detail,price,saleNumber,img_url,family";
    sql +=" FROM jy_product where family='海鲜'";
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
});
//功能5.2： 查询简餐产品
app.get("/getJian",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 4;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(pid) as c FROM jy_product";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT pid,title,detail,price,saleNumber,img_url,family";
    sql +=" FROM jy_product where family='简餐'";
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
});
// http://127.0.0.1:3000/addCarts?uid=1&ctitle=波士顿龙虾粥&cprice=168&countNumber=1&cimg_url=http://127.0.0.1:3000/imgs/products/zhou.jpg
//功能6： 加入购物车
app.get("/addCarts",(req,res)=>{
  //1：参数 uid pid number
  var uid=1;
  var pid=parseInt(req.query.pid);
  var countNumber=parseInt(req.query.num)
  var ctitle=req.query.ctitle
  var cprice=req.query.cprice
  var cimg_url=req.query.cimg_url
  console.log(pid+'--'+countNumber)
  // 根据pid和uid查询商品是否存在，如果存在，直接修改countNumber
  // 如果不存在，直接插入商品信息
  var sql='select cid,countNumber from jy_cart where uid=? and pid=?'
  pool.query(sql,[uid,pid],(err,result)=>{
    if(err) throw err;
    console.log(result)
    if(result.length==0){
      // 直接插入商品
      var sql="INSERT INTO `jy_cart`(`cid`, `countNumber`, `pid`, `uid`,`ctitle`,`cprice`,`cimg_url`) VALUES (NULL,?,?,?,?,?,?)"
      pool.query(sql,[countNumber,pid,uid,ctitle,cprice,cimg_url],(err,result)=>{
        if(err) throw err
        console.log(result)
        res.send({code:1,msg:'添加成功'})
      })
    }else{
      var cid=result[0].cid
      console.log(cid)
      var newNumber=result[0].countNumber+countNumber
      console.log(result[0].countNumber+'库存的值')
      console.log(countNumber+'传来的值')
      // 直接修改该条数据的根据pid和uid查询商品是否存在，如果存在，直接修改countNumber
      var sql="UPDATE `jy_cart` SET `countNumber`= ? WHERE cid = ?"
      pool.query(sql,[newNumber,cid],(err,result)=>{
        if(err) throw err
        console.log(result)
        res.send({code:2,msg:'修改成功'})
      })
    }
  })
})
//功能7： 获取购物车列表信息
app.get("/getCarts",(req,res)=>{
  // 获取用户id存储在session中
  // var uid=req.session.uid;
  var uid=1;
  var sql='select cid,ctitle,cprice,countNumber,cimg_url,pid from jy_cart where uid=?'
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
  })
})
//功能8： 查询搜索内容
app.get('/getKeyProducts',(req,res)=>{
  var kwords=req.query.kwords;
  var pno=req.query.pno;
  console.log(typeof(kwords))
  console.log(kwords)
  if(pno===undefined) pno=0;
  //macbook i5 128g
  kwords=kwords.split(" ");
  //[macbook,i5,128g]
  var arr=kwords.map(function(){
    return " title like ? ";
  })
  //[title like ? , title like ? , title like ?]
  var titles=arr.join(" and ");
  //title like ? and title like ? and title like ?
  var sql="select *  from jy_product where "+titles;
  kwords.forEach(function(val,i,arr){
    kwords[i]=`%${val}%`;
  })
  //[%macbook%,%i5%,%128g%]
  console.log(kwords)
  pool.query(sql,kwords,(err,result)=>{
    if(err) console.log(err);
    var count=result.length;
    var pageCount=Math.ceil(count/9)
    var products=result.slice(pno*9,pno*9+9)
                              //0
                              //9
                              //18
    var output={pno,count,pageCount,products}
    res.send(output);
  })
})
//功能9： 商品详情表
app.get("/getDetails",(req,res)=>{
  var pid=req.query.pid
  if(!pid){
    res.send({code:-1,msg:'pid required'})
  }
  var sql='select * from jy_product where pid = ?'
  pool.query(sql,pid,(err,result)=>{
    if(err) throw err
    res.send({code:1,data:result})
  })
})
// 功能10：删除购物车
app.get("/deleteCarts",(req,res)=>{
  var cidList=req.query.cidList
  console.log(cidList)
  cidList=JSON.parse(cidList)
  console.log(cidList)
  console.log(typeof(cidList))
  for(var i=0;i<cidList.length;i++){
    var cid=cidList[i]
    var sql='DELETE FROM `jy_cart` WHERE cid = ?'
    pool.query(sql,[cid],(err,result)=>{
      if(err) throw err
    })
  }
  res.send({code:1,msg:'删除成功'})
})
// 功能11：修改购物车商品的数量
app.get("/updateCarts",(req,res)=>{
  //参数 id count
  var cid=parseInt(req.query.cid);
  var countNumber=parseInt(req.query.countNumber);
  // console.log(cid+"--"+countNumber)
  //SQL UPDATA
  var sql="UPDATE jy_cart SET countNumber=? WHERE cid=?"
  pool.query(sql,[countNumber,cid],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"更新成功"})
    }else{
      res.send({code:-1,msg:"更新失败"})
    }
  })
  //json
})





app.get("/getNews",(req,res)=>{
  //1:参数 pno 页码 pageSize 页大小
  var pno=req.query.pno;
  console.log(pno)
  var pageSize=req.query.pageSize;
  //1.2：默认值
  if(!pno){pno=1}
  if(!pageSize){pageSize=7}
  //2:验证正则表达式
  var reg=/^\d{1,}$/
  if(!reg.test(pno)){res.send({code:-1,msg:"页码格式不正确"})}
  if(!reg.test(pageSize)){res.send({code:-2,msg:"页大小格式不正确"})}
  //3:创建sql
  var progress=0;
  obj={code:1};
  var sql="SELECT count(id) as c FROM xz_news"
  pool.query(sql,(err,result)=>{
    if(err) throw err;
   // console.log(result[0].c)
    var pageCount = Math.ceil(result[0].c/pageSize);
      obj.pageCount = pageCount;
      progress += 50;
      if(progress == 100){
      res.send(obj);
      }
  })
  var sql="SELECT id,ctime,title,img_url,point FROM xz_news LIMIT ?,?"
  var offset=parseInt((pno-1)*pageSize);
  pageSize=parseInt(pageSize)
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err) throw  err;
    //console.log(result)
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  })
  //4:查询总页数
  //SELECT count(id) FROM xz_news
  //查询当前页内容
  //SELECT id,citime,title,img_url,point FROM xz_news LIMIT (pno-1)*pageSize?,7
  //json
  //{code:1,pageCount:3,data:[...]}
})
//新闻详情的查询
app.get("/getNewsInfo",(req,res)=>{
  var id=req.query.id;
  var sql="SELECT id,title,ctime,content FROM xz_news  WHERE id=?"
  if(!id){res.send({code:-1,msg:"id不正确"})}
  pool.query(sql,[id],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result[0]})
  })
})
//功能4：发表评论
app.get("/addComment",(req,res)=>{
  var nid=req.query.nid;
  var content=req.query.content
  var sql="INSERT INTO xz_comment(id,content,ctime,nid) VALUES(null,?,now(),?)";
  pool.query(sql,[content,nid],(err,result)=>{
    if(err) throw err;
    console.log(result)
    if(result.affectedRows>0){
    res.send({code:1,msg:"发表成功"})
    }else{
      res.send({code:-1,msg:"发表失败"})  
    }
  })
})
//功能5：依据新闻编号(id),查询指定新闻的评论信息
app.get("/getComment",(req,res)=>{
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  var nid=req.query.nid;
  //1.2：默认值
  if(!pno){pno=1}
  if(!pageSize){pageSize=7}
  //2:验证正则表达式
  var reg=/^\d{1,}$/
  if(!reg.test(pno)){res.send({code:-1,msg:"页码格式不正确"})}
  if(!reg.test(pageSize)){res.send({code:-2,msg:"页大小格式不正确"})}
  //3:创建sql
  var progress=0;
  obj={code:1};
  var sql="SELECT count(id) as c FROM xz_comment WHERE nid=?"
  pool.query(sql,[nid],(err,result)=>{
    if(err) throw err;
   // console.log(result[0].c)
    var pageCount = Math.ceil(result[0].c/pageSize);
      obj.pageCount = pageCount;
      progress += 50;
      if(progress == 100){
      res.send(obj);
      }
  })
  var sql="SELECT id,ctime,content FROM xz_comment WHERE nid=? ORDER BY id DESC LIMIT ?,?  "
  var offset=parseInt((pno-1)*pageSize);
  pageSize=parseInt(pageSize)
  pool.query(sql,[nid,offset,pageSize],(err,result)=>{
    if(err) throw  err;
    //console.log(result)
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  })
})

//#功能六:商品列表
app.get("/getGoodsList",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 4;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM xz_product";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT id,name,img_url,price,bank";
    sql +=" FROM xz_product";
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
});
//http://127.0.0.1:3000/addCart?pid=1&uid=1&price=10.00&count=1
//功能七:将商品信息添加至购物车
app.get("/addCart",(req,res)=>{
  //1：参数 uid pid price count
  var uid=parseInt(req.query.uid);
  var pid=parseInt(req.query.pid);
  var price=parseFloat(req.query.price);
  var count=parseInt(req.query.count);

  var sql="INSERT INTO `xz_cart`(`id`, `uid`, `pid`, `price`, `count`) VALUES (null,?,?,?,?)"
  pool.query(sql,[uid,pid,price,count],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"添加成功"})
    }else{
      res.send({code:-1,msg:"添加失败"})
    }
  })
})
//功能八：查询商品详细信息
app.get("/getProduct",(req,res)=>{
  var pid=parseInt(req.query.id)
  var sql="SELECT id,name,img_url,price,bank FROM xz_product WHERE id=?";
  pool.query(sql,[pid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result[0]})
  })
})
//功能九：用户注册
app.get("/register",(req,res)=>{
  var uname=req.query.uname;
  var upwd=req.query.upwd;
  var reg=/^\w{8,12}$/;
  if(!reg.test(uname)){
    res.send({code:-1,msg:"用户名格式不正确"});
    return;
  }
  var sql="INSERT INTO xz_login VALUES(null,?,md5(?))";
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
       res.send({code:1,msg:"注册成功"})
    }else{
      res.send({code:-1,msg:"注册失败"}) 
    }
  })
})
//功能十：失去焦点验证用户名是否已存在
app.get("/existsName",(req,res)=>{
  var uname=req.query.uname;
  //console.log(uname)
  var reg=/^\w{8,12}$/;
  if(!reg.test(uname)){
    res.send({code:-1,msg:"用户名格式不正确"});
    return;
  }
  var sql="SELECT count(id) as c FROM xz_login WHERE name=?"
  pool.query(sql,[uname],(err,result)=>{
    if(err) throw err;   
    console.log(result);
    console.log(result[0])
    if(result[0].c>0){
      res.send({code:-2,msg:"用户名已存在"})
    }else{
       res.send({code:1,msg:"用户名可以使用"})
    }
  });
})
//功能十一 ：用户登录
app.get("/login",(req,res)=>{
  //参数
  var uname=req.query.uname;
  var upwd=req.query.upwd;
  var regn=/^\w{8,12}$/;
  var regu=/^[0-9a-z]{8,12}$/;
  if(!regn.test(uname)){
    res.send({code:-1,msg:"用户名格式不正确"})
    return;
  }
  if(!regu.test(upwd)){
    res.send({code:-1,msg:"密码格式不正确"})
    return;
  }
  var sql="SELECT count(id) as c,id  FROM xz_login WHERE name=? AND pwd=md5(?)";
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err) throw err;
    if(result[0].c > 0){
      req.session.uid=result[0].id;
      console.log(req.session.uid)
      res.send({code:1,msg:"登录成功"})
    
    }else{
      res.send({code:-1,msg:"用户名或密码错误"})
    }

  })

})
//功能十二：查询购物车中的数据
app.get("/getCartList",(req,res)=>{
  //参数
  var uid=req.session.uid;
  console.log("|"+uid+"|")
  //SQL
  var sql="SELECT p.name,p.img_url,c.count,c.price,c.id  FROM xz_product p,xz_cart c WHERE p.id=c.pid AND c.uid=?"
  //返回值
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    console.log(1111)
    res.send({code:1,data:result})
  })

})
//功能十三：更新购物车中商品数量
app.get("/updateCart",(req,res)=>{
  //参数 id count
  var id=parseInt(req.query.id);
  var count=parseInt(req.query.count);
  //SQL UPDATA
  var sql="UPDATE xz_cart SET count=? WHERE id=?"
  pool.query(sql,[count,id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"更新成功"})
    }else{
      res.send({code:-1,msg:"更新失败"})
    }
  })
  //json
})
// 功能十四：退出登录
app.get("/Logout",(req,res)=>{
  req.session.uid=null;
  res.send({code:1,msg:"退出登录"})
})
// 功能十五：九宫格数据
app.get('/navImages',(req,res)=>{
  // var sql="SELECT id,img_url,title FROM xz_nav";
  // pool.query(sql,(err,result)=>{
  //   res.send({code:1,data:result})
  // })
  res.send([
    { id: 1, img_url: "http://127.0.0.1:3000/img/icons/grid-01.png", title: "美食" },
    { id: 2, img_url: "http://127.0.0.1:3000/img/icons/grid-03.png", title: "结婚啦" },
    { id: 3, img_url: "http://127.0.0.1:3000/img/icons/grid-04.png", title: "卡拉OK" },
    { id: 4, img_url: "http://127.0.0.1:3000/img/icons/grid-05.png", title: "找工作" },
    { id: 5, img_url: "http://127.0.0.1:3000/img/icons/grid-06.png", title: "辅导班" },
    { id: 6, img_url: "http://127.0.0.1:3000/img/icons/grid-07.png", title: "汽车保养" },
    { id: 7, img_url: "http://127.0.0.1:3000/img/icons/grid-08.png", title: "租房" },
    { id: 8, img_url: "http://127.0.0.1:3000/img/icons/grid-09.png", title: "装修" },
    { id: 9, img_url: "http://127.0.0.1:3000/img/icons/grid-02.png",title: "更多" } 
  ])
})
// 功能十六：美食表
app.get("/getShopList",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 4;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM xz_shoplist";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT id,img_url,dname,dphone,daddr,dtime,dpoint";
    sql +=" FROM xz_shoplist";
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
});
// 功能十七：添加商品
app.get("/saveP",(req,res)=>{
  //1：获取参数pname price
  var pname=req.query.pname;
  var price=req.query.price;
  console.log(pname)
  //2:验证获取的数据
    var reg1=/^[0-9]{1,}\.[0-9]{1,2}?$/;
    if(!pname){
      res.send({code:-1,msg:"用户名格式不正确"})
      return;}
    if(!reg1.test(price)){
      res.send({code:-1,msg:"价格格式不正确"})
      return;
    }
    //3：创建sql语句添加
    var sql="INSERT INTO xz_product VALUES(null,?,'http://127.0.0.1:3000/img/banner1.png',?,1)"
    //4：判断添加是否成功并且返回值
    pool.query(sql,[pname,price],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0){
        res.send({code:1,msg:"商品添加成功"})
      }else{
        res.send({code:-1,msg:"商品添加失败"})
      }
    })
})
//功能十九：获取信息
app.get("/getMessage",(req,res)=>{
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  //1.2：默认值
  if(!pno){pno=1}
  if(!pageSize){pageSize=2}
  //2:验证正则表达式
  var reg=/^\d{1,}$/
  if(!reg.test(pno)){res.send({code:-1,msg:"页码格式不正确"})}
  if(!reg.test(pageSize)){res.send({code:-2,msg:"页大小格式不正确"})}
  //3:创建sql
  var progress=0;
  obj={code:1};
  var sql="SELECT count(id) as c FROM xz_message"
  pool.query(sql,(err,result)=>{
    if(err) throw err;
   // console.log(result[0].c)
    var pageCount = Math.ceil(result[0].c/pageSize);
      obj.pageCount = pageCount;
      progress += 50;
      if(progress == 100){
      res.send(obj);
      }
  })
  var sql="SELECT id,title,desc2,img_url,ctime,content FROM xz_message ORDER BY id DESC LIMIT ?,?  "
  var offset=parseInt((pno-1)*pageSize);
  pageSize=parseInt(pageSize)
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err) throw  err;
    //console.log(result)
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  })
})
// 功能二十：小程序上传图片
app.post("/upload",upload.single("mypic"),(req,res)=>{
  //7.判断文件大小如果超过 2MB 禁止上传
  var size=req.file.size/1024/1024;
  if(size>2){
    res.send({code:-1,msg:"上传图片过大，不能超过2MB"});
    return;
  }
  //8.判断文件类型必须是图片
  //image/gif/jpg/png
  var type=req.file.mimetype;
  var i2=type.indexOf("image");
  if(i2==-1){
    res.send({code:-2,msg:"只能上传图片"});
    return;
  }
  //9.创建新图片文件
  var src=req.file.originalname;
  var fTime=new Date().getTime();
  var fRane=Math.floor(Math.random()*9999);
  var i3=src.lastIndexOf(".");
  var suff=src.substring(i3,src.length);
  var des="./upload/"+fTime+fRane+suff;
  //10.将临时文件移动 /upload目录下
  fs.renameSync(req.file.path,des);
  //11.返回上传成功消息
  res.send({code:1,msg:"图片上传成功"});
});