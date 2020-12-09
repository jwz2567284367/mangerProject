<template>
  <div class="">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="menulist"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
import { reqroleadd, reqrolelistone, reqroleedit } from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      menulist: "menu/list",
    }),
  },
  data() {
    return {
      width: "150px",
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
      indexRouters: indexRouters,
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
     empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      }
      this.$nextTick(() => {
    this.$refs.tree.setCheckedKeys([])
});
     },
    hide() {
      this.info.isshow = false;
    },
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqroleadd(this.form).then((res) => {
        this.hide();
        this.empty()
      });
    },

    ...mapActions({
      requestmenulist: "menu/requestmenulist",
      requestrolelist: "role/requestrolelist",
    }),
    // 获取一条数据
    look(id) {
      reqrolelistone({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.menus = this.$refs.tree.setCheckedKeys(
          JSON.parse(res.data.list.menus)
        );
        this.form.id = id;
      });
    },
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqroleedit(this.form).then((res) => {
        this.requestrolelist();
        this.hide();
      });
    },
  },
  mounted() {
    if (this.menulist.length == 0) {
      this.requestmenulist();
    }
    console.log(this.menulist);
  },

  watch: {},
};
</script>
<style>
</style>