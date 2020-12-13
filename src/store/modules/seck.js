import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {
  reqsecklist,
} from '../../util/request'
const state = {
  list: [],//请求回来的数据
  
  
}
const mutations = {
  changelist(state, arr) {
    state.list = arr
  },
  
}
const actions = {
  requestsecklist(context) {
    reqsecklist({
      istree:true,
    }).then(res => {
      context.commit('changelist', res.data.list);
      
    })
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