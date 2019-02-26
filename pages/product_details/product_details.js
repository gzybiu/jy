// pages/product_details/product_details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsList:[]
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