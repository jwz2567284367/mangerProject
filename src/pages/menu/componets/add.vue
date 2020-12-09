<template>
  <div class="">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="width">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changepid"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menulist"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="width">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          :label-width="width"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option label="转轮" value="el-icon-loading">
              <i class="el-icon-loading"></i>
            </el-option>
            <el-option label="眼睛" value="el-icon-view">
              <i class="el-icon-view"></i>
            </el-option>
            <el-option label="左箭头" value="el-icon-d-arrow-left">
              <i class="el-icon-d-arrow-left"></i>
            </el-option>
            <el-option label="右箭头" value="el-icon-d-arrow-right">
              <i class="el-icon-d-arrow-right"></i>
            </el-option>
            <el-option label="别针" value="el-icon-paperclip">
              <i class="el-icon-paperclip"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
            v-for="item in indexRouters"
              :label="'/' + item.path"
              :value="item.name"             
              :key="item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isadd"
          >添加</el-button
        >
        <el-button type="primary" @click="update()" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRouters } from "../../../router/index";
import { reqmenuadd, reqmenulistone, reqmenuedit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      width: "150px",
      form: {
        pid: '',
        title: "",
        type: 0,
        icon: "",
        url: "",
        status: 1,
      },
      indexRouters: indexRouters,
    };
  },
  methods: {
    // 取消弹框
    hide() {
      this.info.isshow = false;
    },
  
    // 重置
    empty() {
      this.form = {
        pid: "",
        title: "",
        type: 0,
        icon: "",
        url: "",
        status: 1,
      }
    },
      ...mapActions({
      requestmenulist: "menu/requestmenulist",
    }),
    // 添加操作
    add() {
      reqmenuadd(this.form).then((res) => {
        console.log(res);
        // this.request;
        this.hide();
        this.requestmenulist();
      });
    },
    // 修改type的状态
    changepid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },

    // 查看一条数据
    look(id) {
      reqmenulistone({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        
      });
    },
    // 修改
    update() {
      reqmenuedit(this.form).then((res) => {
        this.hide();
        this.requestmenulist();
        this.empty();
      });
    },
  },
  mounted() {},
  computed: {
    ...mapGetters({
      menulist: "menu/list",
    }),
  },
  watch: {},
};
</script>
<style>
</style>