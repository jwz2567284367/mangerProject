<template>
  <div class="">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="page"
      :page-size="size"
      :pager-count="11"
      :total="total"
      @current-change="currentchange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { requserdel } from "../../../util/request";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "manger/list",
      total: "manger/total",
      page: "manger/page",
      size: "manger/size",
    }),
  },
  data() {
    return {};
  },
  methods: {
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      requserdel({ uid: id }).then((res) => {
        alert("角色删除成功");
        this.requestuserlist();
        this.requestusercount();
        this.changecurrentpages(1);
      });
    },
    ...mapActions({
      requestuserlist: "manger/requestuserlist",
      requestusercount: "manger/requestusercount",
      changecurrentpages: "manger/changecurrentpages",
    }),
    // 修改当前页码
    currentchange(a) {
      console.log(a);
      this.changecurrentpages(a);
    },
  },
  mounted() {
    this.requestuserlist();
    this.requestusercount();
  },

  watch: {},
};
</script>
<style>
.el-pagination {
  text-align: center;
  height: 45px;
}
.el-pagination li,
.el-pagination button {
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
</style>