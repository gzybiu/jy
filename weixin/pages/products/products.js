// pages/products/products.js
const App=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
  },

  switchTab(e) {
    // console.log(e)
    let tab = e.currentTarget.id
    if (tab === 'tableft') {
      this.setData({ currentTab: 0 })
      this.loadProduct()
    } else if (tab === 'tabmid') {
      this.setData({ currentTab: 1 })
      this.loadComments()
    } else if (tab === 'tabright') {
      this.setData({ currentTab: 2 })
    }
  },
  loadComments:function(){
    // console.log('loadmore')
    var assessment = this.selectComponent('#assessment')
    console.log(assessment)
    // 父组件里执行子组件的方法
    assessment.loadMore()
  },
  jumpBack:function(){
    // 跳转至上一页
    wx.navigateBack()
  },
  loadProduct:function(){
    var product = this.selectComponent('#product')
    console.log(product)
    product.indexLoad()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadProduct()
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