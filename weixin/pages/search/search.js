// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swords:'',
    keyList:[]
  },
  jumpBack: function () {
    // 跳转至上一页
    wx.navigateBack()
  },
  // 跳转至商品详情表
  jumpDetails: function (e) {
    console.log(e)
    var pid = e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '../product_details/product_details?pid=' + pid,
    })
  },
  //获取搜索框的值，使用form的bindsubmit事件，同时需要设置button的form类型为submit
  getSearchWords: function (e) {
    // console.log(e)
    var key = e.detail.value.swords
    this.setData({ swords: key })
  },
  // 传入搜索词，向后台发送请求搜索商品列表
  getKeywordsProducts:function(keyWords){
    // console.log(keyWords)
    var kwords = keyWords;
    var url = 'http://127.0.0.1:3000/getKeyProducts?kwords=' + kwords
    wx.request({
      url: url,
      success:(res)=>{
        wx.showToast({
          title: '加载中',
          icon:'loading',
          duration:1000
        })
        setTimeout(function(){wx.hideToast()},1000)
        this.setData({ keyList: res.data.products})
        console.log(this.data.keyList)
      }
    })
  },
  // 点击按钮调用getKeywordsProducts方法
  jumpSearch:function(){
    var swords=this.data.swords
    // console.log(swords)
    this.getKeywordsProducts(swords)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      swords: options.kwords
    })
    this.getKeywordsProducts(options.kwords)
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