import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import menu from './modules/menu'
import role from './modules/role'
import manger from './modules/manger'
import cate from './modules/cate'
import specs from './modules/specs'
export default new Vuex.Store({
 modules: {
   menu,
    role,
    manger,
    cate,
   specs,
 }
})