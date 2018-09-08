/*
 * @Author: lsp 
 * @Date: 2017-05-19 13:22:02 
 * @Last Modified by:   lsp 
 * @Last Modified time: 2017-05-22 13:22:02 
 * @describe 没有头部标题和尾部导航的页面
 */
<template>
  <div id="app">
    <transition :name="transitionName">
			<router-view></router-view>
		</transition>
  </div>
</template>

<script>
import Layout from "@/Layout";

export default {
  name: "app",
  components: {
    Layout
  },
  data() {
    return {
      transitionName: ''
    };
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  }
};
</script>

<style>
html {
  font-size: 16px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
