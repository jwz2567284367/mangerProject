// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入静态资源
import './assets/css/reset.css'
// Vue.config.productionTip = false

// 引入elementui
// import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue';
Vue.use(ElementUI);
/* eslint-disable no-new */

// 导入仓库
import store from './store/index'
// 图片路径
Vue.prototype.$preimg = 'http://localhost:3000';
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
