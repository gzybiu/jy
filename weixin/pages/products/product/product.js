// pages/products/product/product.js
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
    currentTab: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      // console.log(e)
      let tab = e.currentTarget.id
      if (tab === 'tableft') {
        this.setData({ currentTab:0})
        this.indexLoad()
        // console.log(this.data.currentTab)
      } else if (tab === 'tabmid') {
        this.setData({currentTab:2})
        // console.log(this.data.currentTab)
        this.indexHai()
      } else if (tab === 'tabright') {
        this.setData({currentTab:4})
        this.indexJian()
        // console.log(this.data.currentTab)
      }
    },
    indexLoad:function(){
      var all = this.selectComponent('#all')
      all.loadProduct()
    },
    indexHai:function(){
      var hai = this.selectComponent('#hai')
      hai.loadHai()
    },
    indexJian:function(){
      var jian = this.selectComponent('#jian')
      jian.loadJian()
    }
  }
})
