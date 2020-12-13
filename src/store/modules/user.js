import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

// import {
//   reqcatelist,
// } from '../../util/request'
const state = {
   list: sessionStorage.getItem('list') ? JSON.parse(sessionStorage.getItem('list')):{} //请求回来的数据
  
  
}
const mutations = {

  changelist(state, obj) {
    state.list = obj
    sessionStorage.setItem('list',JSON.stringify(obj))
  },
  
}
const actions = {
  requestuserlist(context,obj) {
    context.commit('changelist',obj)
  },
  
}
const getters = {
  list(state) {
    return state.list
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}