import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {
  requserlist,
  requsercount
} from '../../util/request'
const state = {
  list: [], //请求回来的数据
  total: 0, //请求总数
  size: 2,
  page: 1,

}
const mutations = {
  changelist(state, arr) {
    state.list = arr
  },
  // 获取总数
  changecount(state, num) {
    state.total = num
  },
  // 修改当前页
  changepage(state, page) {
    state.page = page
  }
}
const actions = {
  requestuserlist(context) {
    requserlist({
      page: context.state.page,
      size: context.state.size,
    }).then(res => {
      context.commit('changelist', res.data.list);

    })
  },
  // 请求获取总数
  requestusercount(context) {
    requsercount().then(res => {
      context.commit('changecount', res.data.list[0].total)
    })
  },
  // 修改当前页码数
  changecurrentpages(context, page) {
    context.commit("changepage", page)
    context.dispatch('requestuserlist')
  }
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
