#设置客户端连接服务器使用的编码
SET NAMES UTF8;
#丢弃数据库xuezi，如果存在的话
DROP DATABASE IF EXISTS jia;
#创建数据库，设置存储的编码
CREATE DATABASE jia CHARSET=UTF8;
#进入该数据库
USE jia;
#创建用户评论的数据表
CREATE TABLE user_comments(
	cid SMALLINT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(50) UNIQUE NOT NULL,
	user_img VARCHAR(50),
    utime DATETIME,
    score SMALLINT,
    content VARCHAR(255),
    contentPic VARCHAR(255)
);
#插入数据
INSERT INTO user_comments VALUES
('NULL','大富豪','http://127.0.0.1:3000/imgs/user_comments/suan.jpg','2018-10-20',80,'这是一家非常好吃获得店铺，终于点到了好吃的号海鲜粥，非常不错','http://127.0.0.1:3000/imgs/user_comments/suan.jpg'),
('NULL','jhon','http://127.0.0.1:3000/imgs/user_comments/xie.jpg','2018-10-20',80,'终于点到了好吃的号海鲜粥，非常不错','http://127.0.0.1:3000/imgs/user_comments/xie.jpg'),
('NULL','peter','http://127.0.0.1:3000/imgs/user_comments/longxia.jpg','2018-10-20',80,'好吃的大龙虾，终于点到了好吃的号海鲜粥，非常不错','http://127.0.0.1:3000/imgs/user_comments/longxia.jpg'),
('NULL','haha','http://127.0.0.1:3000/imgs/user_comments/suan.jpg','2018-10-20',80,'这是一家非常好吃获得店铺，终于点到了好吃的号海鲜粥，非常不错','http://127.0.0.1:3000/imgs/user_comments/suan.jpg'),
('NULL','你是谁','http://127.0.0.1:3000/imgs/user_comments/suan.jpg','2018-10-20',80,'这是一家非常好吃获得店铺，终于点到了好吃的号海鲜粥，非常不错','http://127.0.0.1:3000/imgs/user_comments/suan.jpg'),
('NULL','真不错','http://127.0.0.1:3000/imgs/user_comments/suan.jpg','2018-10-20',80,'这是一家非常好吃获得店铺，终于点到了好吃的号海鲜粥，非常不错','http://127.0.0.1:3000/imgs/user_comments/suan.jpg'),
('NULL','大家好','http://127.0.0.1:3000/imgs/user_comments/suan.jpg','2018-10-20',80,'这是一家非常好吃获得店铺，终于点到了好吃的号海鲜粥，非常不错','http://127.0.0.1:3000/imgs/user_comments/suan.jpg')

#创建全部商品的数据表
CREATE TABLE jy_product(
	pid SMALLINT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(128),
	detail VARCHAR(255),
	price SMALLINT,
	saleNumber SMALLINT,
    family VARCHAR(10)
);
INSERT INTO jy_product(`pid`, `title`, `detail`, `price`, `saleNumber`, `family` ,`img_url`)  VALUES


('1','油淋鲈鱼','新鲜鲈鱼，切薄片，油淋焖熟...入口即化',168,9,'海鲜','http://127.0.0.1:3000/imgs/products/luyu.jpg'),
('2','包装','本店采用精品包装，无毒无味，让您的随手享用成为一种逼格',0,0,'无','http://127.0.0.1:3000/imgs/products/he.jpg'),
('3','糖醋排骨饭','配料：精选仔排（250g左右),米饭一份，蔬菜一份，可口可乐一份','32','11','简餐','http://127.0.0.1:3000/imgs/products/paigu.jpg'),
('4','海鲜意面','青口贝，虾仁，西蓝花，意面','45','7','简餐','http://127.0.0.1:3000/imgs/products/yimian.jpg'),
('5','鸡汁黑椒土豆泥','精选土豆，搭配鸡汤和黑椒','12','1','简餐','http://127.0.0.1:3000/imgs/products/tudou.jpg'),
('6','蔬菜开心杯','西蓝花，精选美国水果玉米','5','96','简餐','http://127.0.0.1:3000/imgs/products/shucai.jpg'),
('7','煎蛋','草鸡蛋一只','3','9','简餐','http://127.0.0.1:3000/imgs/products/jidan.jpg'),
('8','M9和牛汉堡','选用M9级澳洲和牛肉做肉饼，入口即化，可选做牛肉饼成熟度，推荐成熟度3成','108','0','简餐','http://127.0.0.1:3000/imgs/products/zhou.jpg')
('NULL','炭烤波士顿龙虾','新鲜大虾，龙虾中波士顿的肉质相对实些，用来焗或是闷伊面是不错的选择',198,9,'海鲜','http://127.0.0.1:3000/imgs/products/longxia.jpg'),
('NULL','阿拉斯加帝王蟹','帝王蟹的营养价值含有丰富的蛋白质、微量元素等营养，对身体有很好的滋补作用',298,9,'海鲜','http://127.0.0.1:3000/imgs/products/xie.jpg'),
('NULL','松鼠桂鱼','取鲔鱼肚皮，去骨，拖蛋黄炸黄，作松鼠式。',168,9,'简餐','http://127.0.0.1:3000/imgs/products/gui.jpg'),
('NULL','培根焗饭','简单又好吃哦',35,9,'简餐','http://127.0.0.1:3000/imgs/products/jufan.jpg'),
('NULL','波士顿龙虾粥','温暖香滑的砂锅龙虾粥，让它稍微凉一点再喝，更粘稠有滋味',198,9,'简餐','http://127.0.0.1:3000/imgs/products/zhou.jpg'),
('NULL','蒜蓉波士顿龙虾','新鲜大虾，龙虾中波士顿的肉质相对实些，用来焗或是闷伊面是不错的选择',198,9,'海鲜','http://127.0.0.1:3000/imgs/products/suan.jpg')
#创建购物车表
CREATE TABLE jy_cart(
    cid SMALLINT PRIMARY KEY AUTO_INCREMENT,
    ctitle VARCHAR(128),
	cprice SMALLINT,
    countNumber SMALLINT,
    cimg_url VARCHAR(60),
	pid SMALLINT NOT NULL,
    uid SMALLINT NOT NULL,
     FOREIGN  KEY(uid) REFERENCES jy_user(uid),
     FOREIGN  KEY(pid) REFERENCES jy_product(pid)
) 
INSERT INTO jy_cart VALUES
(NULL,'油淋鲈鱼',168,2,'http://127.0.0.1:3000/imgs/luyu.jpg',1,1),
(NULL,'糖醋排骨饭',32,1,'http://127.0.0.1:3000/imgs/paigu.jpg',3,1),
(NULL,'油淋鲈鱼',168,3,'http://127.0.0.1:3000/imgs/luyu.jpg',1,2),
(NULL,'糖醋排骨饭',32,1,'http://127.0.0.1:3000/imgs/paigu.jpg',3,2),
(NULL,'M9和牛汉堡',108,1,'http://127.0.0.1:3000/imgs/heniu.jpg',8,2),
(NULL,'M9和牛汉堡',108,2,'http://127.0.0.1:3000/imgs/heniu.jpg',8,1)
CREATE TABLE jy_user(
    uid SMALLINT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(50)
)
INSERT INTO jy_user VALUES
(1,'dingding'),(2,'tom')