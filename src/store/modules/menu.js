import {
  reqmenulist
} from '../../util/request'
const state = {
  // 请求回来的数据
  list: []
}
const mutations = {
  changelist(state, arr) {
    state.list = arr;
  }
}
const actions = {
  requestmenulist(context) {
    reqmenulist({
      istree: true
    }).then(res => {
      context.commit('changelist', res.data.list)
    })
  }
}
const getters = {
  list(state) {
    return state.list
  }
}



export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
