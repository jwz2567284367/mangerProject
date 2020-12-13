<template>
  <div class="">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form>
        <el-form-item label="手机号" :label-width="width">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      
        <el-form-item label="昵称" :label-width="width">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
          <p>留空则不能修改</p>
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
        <el-button type="primary" @click="update()">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqmemberlistone, reqmemberedit,reqmemberlist} from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      viplist: "vip/list",
    }),
  },
  data() {
    return {
      width: "150px",
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
     
    };
  },
  methods: {
    // 隐藏弹框
    hide() {
      this.info.isshow = false;
    },
    ...mapActions({
      requestmemberlist: "vip/requestmemberlist",
    }),
    // 获取一条数据
    look(id) {
      reqmemberlistone({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
        this.form.uid = id;
      });
    },
    update() {
      reqmemberedit(this.form).then((res) => {
        this.requestmemberlist();
        this.hide();
      });
    },
  },
  mounted() {
    if (this.viplist.length == 0) {
      this.requestmemberlist();
    }
    console.log(this.viplist);
  },

  watch: {},
};
</script>
<style>
</style>