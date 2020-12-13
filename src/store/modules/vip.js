import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {
  reqmemberlist,

} from '../../util/request'
const state = {
  list: [], //请求回来的数据

}
const mutations = {
  changelist(state, arr) {
    state.list = arr
  },

}
const actions = {
  requestmemberlist(context) {
    reqmemberlist().then(res => {
      context.commit('changelist', res.data.list);

    })
  },
}
const getters = {
  list(state) {
    return state.list
  },
  total(state) {
    return state.total
  },
  page(state) {
    return state.page
  },
  size(state) {
    return state.size
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
