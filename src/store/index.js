/*
 * @Author: Lsp 
 * @Date: 2017-05-19 13:23:18 
 * @Last Modified by: Lsp
 * @Last Modified time: 2017-05-23 14:19:33
 */

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);
const path_title_array = [['/home', '机票'], ['/favoriteFlight', '关注'], ['/order', '机票订单'], ['/person', '我的']];
const state = {
  showNavAndTab: true,
  titleMap: new Map(path_title_array),
  tabValue: '机票'
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
