import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
const login = () => import('../pages/login/login')
const index = () => import('../pages/index/index')
const home = () => import('../pages/home/home')
const menu = () => import('../pages/menu/menu')
const manger = () => import('../pages/manger/manger')
const role = () => import('../pages/role/role')
const classify = () => import('../pages/classify/classify')
const spec = () => import('../pages/spec/spec')
const goods = () => import('../pages/goods/goods')
const banner = () => import('../pages/banner/banner')
const vip = () => import('../pages/vip/vip')
const seckill = () => import('../pages/seckill/seckill')

export const indexRouters = [{
    path: 'menu',
    component: menu,
    name: "菜单管理"
  },
  {
    path: 'role',
    component: role,
    name: "角色管理",
    // 路由独享守卫
    // beforeEnter: (to, from, next) => {
    //   if (from.path == '/index/home') {
    //     next()
    //   } else {
    //     next('/home')
    //   }
    // }
  }, {
    path: 'manger',
    component: manger,
    name: "管理员管理"
  }, {
    path: 'classify',
    component: classify,
    name: "商品分类"
  }, {
    path: 'spec',
    component: spec,
    name: "商品规格"
  }, {
    path: 'goods',
    component: goods,
    name: "商品管理"
  }, {
    path: 'vip',
    component: vip,
    name: "会员管理"
  },
  {
    path: 'banner',
    component: banner,
    name: "轮播图管理"
  },
  {
    path: 'seckill',
    component: seckill,
    name: "秒杀活动"
  },
]


Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      children: [{
          path: 'home',
          component: home,
          // 路由独享守卫
          // beforeEnter: (to, from, next) => {
          //   if (from.path == '/login' && store.state.user.list) {
          //     next()
          //   } else {
          //     next('/login')
          //   }
          // }
        }, {
          path: '',
          redirect: 'home'
        },
        ...indexRouters
      ]
    },
    // {
    //   path: '/',
    //   component: login
    // },
    {
      path: '*',
      redirect: 'login'
    },
  ]
})
// 全局守卫

router.beforeEach((to, from, next) => {
  // 去登录页面
  if (to.path == '/login') next()
  // 判断用户是否登录
  if (store.state.user.list.menus) {
    next()
  } else {
    // this.$router.push('/login')
    // next('/login')
  }
})
export default router
