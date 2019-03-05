const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],//轮播图
    indexList:[], //三张图
    haixinList:[], //海鲜数据表
    jiancanList:[], //简餐数据表
    kwords:'',     //搜索词双向绑定
    showModalStatus:false,  //控制弹窗的显示与隐藏
    cartList:{},    //弹窗中的数据
    number:1      //弹窗的num数据
  },
  //获取搜索框的值，使用form的bindsubmit事件，同时需要设置button的form类型为submit
    getKwords:function(e){
      console.log(e)
      var key = e.detail.value.kwords
      this.setData({kwords:key})
    },
  // 跳转至搜索列表
  jumpSearch:function(){
    var kwords = this.data.kwords;
    wx.navigateTo({
      url: '../search/search?kwords=' + kwords,
    })
  },
  // 跳转至商品详情表
  jumpDetails:function(e){
    console.log(e)
    var pid=e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '../product_details/product_details?pid=' + pid,
    })
  },
  //点击购物车图标显示底部弹出框
  addCart: function (e) {
    console.log(e)
    var pid = e.currentTarget.dataset.pid;
    var title = e.currentTarget.dataset.title;
    var price = e.currentTarget.dataset.price;
    var url= e.currentTarget.dataset.url;
    var cartList={};
    cartList.pid= pid;
    cartList.title = title;
    cartList.price = price;
    cartList.url = url;
    this.setData({ cartList: cartList})
    // console.log(this.data.cartList.price)
    this.showModal();
  },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    this.setData({ cartList:{},number:1})
    console.log(this.data.cartList)
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
// 按钮减
  minusCount:function(){
    var num=this.data.number
    if(num>1){
      num--;
    }else{
      num=1;
    }
    this.setData({number:num})
    // console.log(this.data.number+'--')
    
  },
  // 按钮加
  addCount: function () {
    var num = this.data.number;
    num++;
    this.setData({ number: num })
    // console.log(this.data.number+'+++')
  },
// 加入购物车,修改后台数据，弹框通知添加成功
  addCartDetail:function(e){
    var pid = this.data.cartList.pid;
    var num = this.data.number;
    var ctitle = this.data.cartList.title;
    var cprice = this.data.cartList.price;
    var cimg_url = this.data.cartList.url;
    console.log(pid+'****'+num)
    wx.request({
      url: 'http://127.0.0.1:3000/addCarts',
      data: { pid: pid, num: num, ctitle: ctitle, cprice: cprice, cimg_url: cimg_url},
      success:res=>{
        console.log(res.data)
        wx.showToast({
          title: '添加成功',
          duration:1000,
          icon:'success'
        })
        setTimeout(function(){wx.hideToast()},1000)
      }
    })
    this.hideModal()  //添加成功之后隐藏模态框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getImages();
    this.getIndexList();
    this.getIndexProducts();
  },
  // 获取轮播图信息
  getImages:function(){
    var url='http://127.0.0.1:3000/getImg';
    wx.request({
      url: url,
      success:res=>{
        // console.log(res.data)
        this.setData({bannerList:res.data})
        // console.log(this.data.bannerList)
      }
    })
  },
  // 获取3张图
  getIndexList:function(){
    var url = 'http://127.0.0.1:3000/getIndexList';
    wx.request({
      url: url,
      success: res => {
        this.setData({indexList:res.data})
        // console.log(this.data.indexList)

      }
    })
  },
  // 获取商品列表
  getIndexProducts: function () {
    var url = 'http://127.0.0.1:3000/getIndexproduct';
    wx.request({
      url: url,
      success: res => {
        this.setData({haixianList: res.data.haixian })
        this.setData({jiancanList: res.data.jiancan })
        // console.log(this.data.haixianList)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 离开的时候隐藏模态框
    this.hideModal()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})