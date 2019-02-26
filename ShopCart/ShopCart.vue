<template>
  <div class="app-cart">
    <div class="mui-card">
				<div class="mui-card-header">
           <h3>购物车列表</h3>
           <h4>
           全选 <input type="checkbox" @click="selectAll"/>
           </h4>
        </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">

			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item,i) in list" :key="item.id">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" />
						<div class="mui-media-body">
							<p class='mui-ellipsis'>
                <!-- 购物车中商品项目 home/ShopCart.vue start???-->
                <input type="checkbox" :checked="cb"/>
							  {{item.lname}}
                {{item.price}}
                <!--delItem处理删除商品函数-->
                <!--data-id 当前购物车id-->
                <!--data-idx 当前商品下标list-->
                <button @click="delItem" :data-id="item.id" :data-idx="i">删除</button> 
                <!-- 购物车中商品项目 end-->   
              </p>
						</div>
					</a>
				</li>
        </ul> 
					</div>
				</div>
				<div class="mui-card-footer">
          <button>删除选中商品</button>
          小计:￥3.00
        </div>
			</div>
  </div>
</template>
<script>
  //ShopCart.vue 当组件创建成功发送 ajax请求
  //获取购物车列表
  import {Toast} from "mint-ui";
  export default {
    data(){
      return {
        list:[],  
        cb:false //？？？？？
      }
    },
    methods:{ 
      delItem(e){
        //e事件对象 e.target 触发事件对象button
        //target.dataset 自定义属性集合 
        //1:获取当前购物车id
        var id =  e.target.dataset.id;
        var idx = e.target.dataset.idx; //下标
        //2:发送ajax请求
        var url = "http://127.0.0.1:3000/";
        url+="delCartItem?id="+id;
        this.axios.get(url).then(result=>{
            if(result.data.code == 1){
              //3:获取返回结果判断是否删除成功
              Toast("删除成功");
              //4:删除list对应购物车商品对象
              //将数组中对应下标商品删除
              //splice(数组下标,个数); 10:35
              this.list.splice(idx,1);
            }
        })
       
        
      },    
      loadMore(){
        //1:创建变量保存url
        var url = "http://127.0.0.1:3000/";
        url+="cartlist?uid=1";
        //2:发送ajax请求   9:26
        this.axios.get(url).then(result=>{
            //console.log(result.data);
            this.list = result.data.data;
            //完成操作为列表中每个对象添加属性cb
            //cb表示复选框状态 true 当前商品选中 
            //cb表示复选框状态 false 当前商品清除
            //for(var item of this.list){
            //  item.cb = false;
            //}
        });
      },
      selectAll(e){
        //1:获取当前全选复选框状态
        var cb = e.target.checked;
        this.cb = cb;//???????
      }
    },
    created() {
      this.loadMore();
    },
  }
</script>
<style>
</style>