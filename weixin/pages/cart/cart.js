// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true,    // 全选状态，默认全选
    cartIndex:[],             //删除时获取要删除的商品下标
    orderCarts:[]             //选中的商品列表
  },
    // 跳转至首页
  jumpBack: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 跳转至商品详情表
  jumpDetails: function (e) {
    console.log(e)
    var pid = e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '../product_details/product_details?pid=' + pid,
    })
  },
  /**
   * 购物车列表数据我们一般是通过请求服务器拿到的数据，所以我们放在生命周期函数里给 carts 赋值。想到每次进到购物车都要获取购物车的最新状态，而onLoad和onReady只在初始化的时候执行一次，所以我需要把请求放在 onShow 函数里
   */
  getCarts: function () {
    var url = 'http://127.0.0.1:3000/getCarts';
    wx.request({
      url: url,
      // data:{uid:1},
      success: res => {
        console.log(res.data.data)
        if (res.data.data == []) {
          console.log('没有查询到')
          // 显示没有的页面
          this.setData({
            hasList: false,        // 没有数据
            carts: this.data.data
          })
        } else if (res.data.data != []) {
          var newCarts = res.data.data;
          for (var i = 0; i < newCarts.length; i++) {
            newCarts[i].selected = 'true'
          }
          this.setData({
            hasList: true,        // 既然有数据了，那设为true吧
            carts: newCarts,
            selectAllStatus: true  //也需要设置一下，不然离开页面之后再回来状态不对
          })
        }
        this.getTotalPrice()
        this.getOrder();


      }
    })
  },
  // 获取选中的购物车选中数据
  getOrder:function(){
    let carts = this.data.carts;
    var orderCarts = [];
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        orderCarts[orderCarts.length] = carts[i]
      }
    }
    this.setData({ orderCarts: orderCarts })
  },
  /**
   * 点击时选中，再点击又变成没选中状态，其实就是改变 selected 字段。通过 data-index="{{index}}" 把当前商品在列表数组中的下标传给事件。
   */
  selectList(e) {
    // console.log(e)
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let carts = this.data.carts;                    // 获取购物车列表
    const selected = carts[index].selected;         // 获取当前商品的选中状态
    carts[index].selected = !selected;              // 改变状态
    // 默认全选
    var newSelectAll = true;
    // 如果数组数据全部为selected[true],全选
    for (var i = carts.length - 1; i >= 0; i--) {
      if (!carts[i].selected) {
        newSelectAll = false;
        break;
      }
    }
      // 重新渲染数据
    this.setData({
      carts: carts,
      selectAllStatus: newSelectAll
    });
    this.getTotalPrice();           // 重新获取总价
    this.getOrder();               //重新获取结算数量

  },

// 全选按钮
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();                               // 重新获取总价
    this.getOrder();               //重新获取结算数量
  },
  // 计算总价
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                   // 判断选中才会计算价格
        total += carts[i].countNumber * carts[i].cprice;     // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total
    });
    // console.log(this.data.totalPrice)
  },
// 删除商品
  deleteCart() {
    // 获取商品列表数
    let carts = this.data.carts;
    let newList = []; //定义空数组，接收状态为false的数据
    let trueList=[]; //接收状态为true的数据
    // 循环数据，根据是否选中状态，分成两个数组
    for (var i = 0; i < carts.length; i++) {
      // 如果状态为false的商品放到空数组
        console.log(carts[i].selected)
      if (!carts[i].selected) {
        newList[newList.length] = carts[i]
        // console.log(carts[i].selected)
      } else if (carts[i].selected){
        trueList[trueList.length]=carts[i]
      };
    }
    // 如果选中商品为空，提示没有选中商品
    if(trueList.length==0){
      wx.showModal({
        content: '您还没有选择任何商品',
        success:(res)=>{
          if(res.confirm){
            console.log('用户关闭了模态框')
          }
        }
      })
    }else{
      wx.showModal({
        title: '温馨提示',
        content: '您确认删除吗？',
        success: (res)=>{   //换成箭头函数改变this指向问题
          if (res.confirm) {
            this.setData({ carts: newList });   // 页面渲染数据
              this.getTotalPrice()  //重新计算商品价格
              this.getOrder();               //重新获取结算数量
              // 将删除的数据的cid传回后台，删除数据库中购物车的数据
              console.log(trueList)
              var cidList=[] //定义空数组接收所有删除的cid
              for(var i=0;i<trueList.length;i++){
                cidList[i] = trueList[i].cid
              }
              console.log(cidList)
              wx.request({
                url: 'http://127.0.0.1:3000/deleteCarts',
                data: { cidList: cidList},
                success:(res)=>{
                  console.log(res.data)
                }
              })
            }
          },
        fail: function (res) {
          console.log(res);
        }
      })
    }

  },
  // 封装修改购物车的方法。点击加减按钮的时候调用
  updateNumber:function(cid,num){
    wx.request({
      url: 'http://127.0.0.1:3000/updateCarts',
      data: { cid: cid, countNumber:num},
      success:res=>{
        console.log(res.data)
      }
    })
  },
  //按钮减
  minusCount:function(e){
    console.log('min')
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].countNumber;
    let cid = carts[index].cid;
    num = num - 1;
    if(num>=1){
    carts[index].countNumber = num;
    this.setData({
      carts: carts
    });
      this.getTotalPrice();
      this.updateNumber(cid, num); //调用方法修改后台数据库 
    }else{
      num=1
    }
  },
  //按钮加
  addCount: function (e) {
    console.log('add')
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].countNumber;
    let cid = carts[index].cid;
    num = num + 1;
    carts[index].countNumber = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
    this.updateNumber(cid, num); //调用方法修改后台数据库 
  },

  // 结算购物车
 pay:function(){
     if (this.data.orderCarts.length==0){
     wx.showToast({
       title: '未选择商品',
       icon:'none',
       duration:1000
     })
   }else{
      console.log(this.data.totalPrice) 
    }
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.getCarts();
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