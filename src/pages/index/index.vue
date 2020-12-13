<template>
  <div class="">
    <el-container>
      <el-aside width="150px">
        <el-menu
          default-active="2"
          router
          class="el-menu-vertical-demo"
          background-color="#20222A"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="item in list.menus" :key="item.id">
          <el-submenu index="item.url" v-if="item.children">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>{{item.title}} </span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="'/index'+i.url" v-for="i in item.children" :key="i.id">{{i.title}} </el-menu-item>
              <!-- <el-menu-item index="/index/role">角色管理</el-menu-item>
              <el-menu-item index="/index/manger">管理员管理</el-menu-item> -->
            </el-menu-item-group>
          </el-submenu>
           <el-menu-item :index="item.url" v-else>{{item.title}} </el-menu-item>
           </div>
          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/classify">商品分类</el-menu-item>
              <el-menu-item index="/index/spec">商品规格</el-menu-item>
              <el-menu-item index="/index/goods">商品管理</el-menu-item>
              <el-menu-item index="/index/vip">会员管理</el-menu-item>
              <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
          
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="user1"><el-button type="danger" @click="quit">退出</el-button></div>
          <div class="user2">{{list.username}}</div>
           </el-header>
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }} </el-breadcrumb-item>
           
          </el-breadcrumb>
          <div class="rw"><router-view></router-view></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestuserlist:'user/requestuserlist'
    }),
    quit(){
      this.requestuserlist({})
      this.$router.push('/login');
    }
  },
  mounted() {
    // this.requestuserlist()
     console.log(this.list)
  },
  computed: {
    ...mapGetters({
      list:'user/list'
    })
  },
  watch: {},
};
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
 
}

.el-aside {
  background-color: #20222a;
  color: #333;
  height: 100vh;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center;
  line-height: 160px; */
}
.el-aside li {
  width: 150px;
}
.el-menu {
  text-align: center;
}
.el-submenu .el-menu-item {
  min-width: 150px;
  text-align: center;
  padding-left: 0;
}
.rw {
  margin-top: 20px;
}
.user2 {

  float: right;
  
}
.user1 {
  float: right;
  margin-left: 30px;
}
</style>