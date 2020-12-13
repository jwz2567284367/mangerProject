import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {
  reqspecslist, reqspecscount
} from '../../util/request'
const state = {
  list: [], //请求回来的数据
  total: 0, //请求总数
  size: 2,
  page: 1,
  total: 0, //请求总数


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
  requestspecslist(context) {
    reqspecslist({
      // size: 10,
      // page: 1,
   
      page: context.state.page,
      size: context.state.size,
    }).then(res => {
      var arr = res.data.list
      arr.forEach(item => {
        item.attrs = JSON.parse(item.attrs)
      });
      context.commit('changelist', arr);

    })
  },
  // 请求获取总数
  requestspecscount(context) {
    reqspecscount().then(res => {
      context.commit('changecount', res.data.list[0].total)
    })
  },
  // 修改当前页码数
  changecurrentpages(context, page) {
    context.commit("changepage", page)
    context.dispatch('requestspecslist')
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
