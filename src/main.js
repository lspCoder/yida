// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import 'lib-flexible'          //引入flexible实现移动端自适应
import App from './App'

import MuseUI from 'muse-ui'     //引入museUI框架

import minireset from 'minireset.css'
import materialIcons from './assets/iconfont/material-icons.css'
// import myIconfont from './assets/myIconfont/iconfont.css'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css' // 使用 light 主题
import './assets/style/main.css'


import VueTouch from 'vue-touch'      //手机touch事件插件

import router from './router'
import store from './store'
import Api from './Api/Api'
import moment from 'moment'        //日期操作工具插件

import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';

import Mui from 'vue-awesome-mui';           //添加mui组件，监听手机物理返回键

Vue.use(Mui);

Vue.use(Toast, {
    defaultType: 'center',
    duration: 3000,
    wordWrap: true,
    width: '150px'
});


Vue.use(MuseUI);
// Vue.use(axios)
Vue.prototype.$api = Api;
Vue.prototype.$moment = moment;

//moment日期插件国际化
moment.locale('zh-cn');
moment.updateLocale('zh-cn', {
    weekdays : ['周日','周一','周二','周三','周四','周五','周六']
});

Vue.use(VueTouch, { name: 'v-touch' });

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})



