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
      <el-table-column prop="id" label="规格编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="catename" label="规格属性" sortable width="180">
        <template slot-scope="scope">
          <el-tag type="success" v-for="item in scope.row.attrs" :key="item"
            >{{ item }}
          </el-tag>
        </template>
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
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
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
import { reqspecsdel } from "../../../util/request";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "specs/list",
      total: "specs/total",
      page: "specs/page",
      size: "specs/size",
    }),
  },
  data() {
    return {
     
    };
  },
  methods: {
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqspecsdel({ id: id }).then((res) => {
        alert("角色删除成功");
        this.requestspecslist();
        this.requestspecscount();
        this.changecurrentpages(1);
      });
    },
    ...mapActions({
      requestspecslist: "specs/requestspecslist",
       changecurrentpages: "specs/changecurrentpages",
       requestspecscount:"specs/requestspecscount"
    }),
    // 修改当前页码
    currentchange(a) {
      console.log(a);
      this.changecurrentpages(a);
    },
  },
  mounted() {
    this.requestspecslist();
    this.requestspecscount();

  },

  watch: {},
};
</script>
<style >
img {
  width: 80px;
  height: 80px;
}
.el-pagination {
  width: 85vw;
  position: fixed;
  bottom: 150px;
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