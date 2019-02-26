// pages/products/seller/seller.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    phone:'15951759853'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    callPhone:function(phone){
      var phone=this.data.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
    }
  }
})
