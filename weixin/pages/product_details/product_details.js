// pages/product_details/product_details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsList:[],
    showModalStatus:false, //隐藏框遮罩层的初始状态
    isShowModal:false, //点击下一步之后遮罩层的状态
    number:1 //初始弹窗中的数量
  },
  jumpBack: function () {
    // 跳转至上一页
    wx.navigateBack()
  },
  // 跳转至购物车
  jumpCart:function(){
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  // 跳转至首页
  jumpIndex:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
// 获取指定pid信息的商品详情
  getDetails:function(pid){
    var url ='http://127.0.0.1:3000/getDetails?pid='+pid
    wx.request({
      url: url,
      success:(res)=>{
        if(res.data.code==1)
        this.setData({
          detailsList: res.data.data
        })
        // console.log(res.data.data)
        // console.log(this.data.detailsList)
        // console.log(this.data.detailsList[0].title)
      }
    })
  },
//加入购物车
  addCart:function(){
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
  //显示提示框
  showAlert:function(){
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "step-start",
      delay: 0
    })
    this.animation = animation
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export(),
      isShowModal: true
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
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        isShowModal:false
      })
    }.bind(this), 200)
  },
  // 按钮减
  minusCount: function () {
    var num = this.data.number
    if (num > 1) {
      num--;
    } else {
      num = 1;
    }
    this.setData({ number: num })
    // console.log(this.data.number+'--')

  },
  // 按钮加
  addCount: function () {
    var num = this.data.number;
    num++;
    this.setData({ number: num })
    // console.log(this.data.number+'+++')
  },
  // 下一步
  addCartNext:function(){
    
    var pid = this.data.detailsList[0].pid;
    var num = this.data.number;
    var ctitle = this.data.detailsList[0].title;
    var cprice = this.data.detailsList[0].price;
    var cimg_url = this.data.detailsList[0].img_url;
    console.log(pid + '****' + num)
    wx.request({
      url: 'http://127.0.0.1:3000/addCarts',
      data: { pid: pid, num: num, ctitle: ctitle, cprice: cprice, cimg_url: cimg_url },
      success: res => {
        console.log(res.data)
        this.setData({
          showModalStatus:false,
          isShowModal:true
        })
        this.showAlert();
      }
    })
    //this.hideModal()  //添加成功之后隐藏模态框
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pid=options.pid
    // console.log(pid) 获取传过来的pid,调用getDetails的方法
    this.getDetails(pid)
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