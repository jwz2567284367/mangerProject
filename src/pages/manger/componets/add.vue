<template>
  <div class="">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="width">
         <el-select
            v-model="form.roleid"
            placeholder="--请选择--"
          >
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
   <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
          >添 加</el-button
        >
        <el-button type="primary" @click="update()" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexRouters } from "../../../router/index";
import { mapGetters, mapActions } from "vuex";
import { requseradd, requserlistone, requseredit } from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      rolelist: "role/list",
    }),
  },
  data() {
    return {
      width: "150px",
      form: {
        roleid:"",
        username: "",
        password:"",
        status: 1,
      },
      indexRouters: indexRouters,
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    // 重置
     empty() {
      this.form =  {
        roleid:"",
        username: "",
        password:"",
        status: 1,
      }
     },

     // 隐藏弹框
    hide() {
      this.info.isshow = false;
    },
    //添加
    add() {
      requseradd(this.form).then((res) => {
       
        this.empty()
        this.hide();
         this.requestuserlist();
        this.requestusercount()
      });
    },

    ...mapActions({
      requestuserlist: "manger/requestuserlist",
       requestusercount: "manger/requestusercount",
      requestrolelist: "role/requestrolelist",
    }),
    // 获取一条数据
    look(id) {
      requserlistone({ uid: id }).then((res) => {
        this.form = res.data.list;
       this.form.password='';
        this.form.uid = id;
      });
    },
    update() {

      requseredit(this.form).then((res) => {
        this.requestuserlist();
        this.hide();
      });
    },
  },
  mounted() {
    if (this.rolelist.length == 0) {
      this.requestrolelist();
    }
    console.log(this.menulist);
  },

  watch: {},
};
</script>
<style>
</style>