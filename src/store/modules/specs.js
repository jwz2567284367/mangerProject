import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {
  reqspecslist,
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
  requestspecslist(context) {
    reqspecslist({
      istree:true,
    }).then(res => {
      var arr = res.data.list
      arr.forEach(item => {
        item.attrs=JSON.parse(item.attrs)
      });
      context.commit('changelist',arr);
      
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