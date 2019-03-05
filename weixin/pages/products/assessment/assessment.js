// pages/products/assessment/assessment.js
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
    list: [], //1:保存数据
    pageIndex: 0, //2：保存分页页码
    pageSize: 8, //3：分页大小
    hasMore: true,//是否有下一页数据
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore: function () {
      // console.log("分页")
      // 如果当前已经是最后一页，不再发送请求
      //如果没有下一页数据，停止函数执行
      if (this.data.hasMore === false) return;
      wx.showLoading({
        title: '正在加载数据',
      })
      //4:loadMore 分页数据
      var url = "http://127.0.0.1:3000/getProductComment";
      //1:获取第二个数值 pno ps
      var pno = this.data.pageIndex + 1;
      var ps = this.data.pageSize;
      // 获取返回当前页内容
      wx.request({
        url: url,
        data: { pno: pno, pageSize: ps },
        success: (res) => {
          setTimeout(function () {
            wx.hideLoading()
          }, 1000)
          var rows = this.data.list.concat(res.data.data)
          var pc = res.data.pageCount;
          var flag = pno < pc
          this.setData({
            list: rows,
            pageIndex: pno,
            hasMore: flag
          })
          console.log(this.data.pageIndex)
        }
      })
    },
  }
})
