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
      <el-table-column prop="title" label="活动名称" sortable width="180">
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
          <el-button type="danger"   @click="del(scope.row.id)" 
            >删除</el-button
          >
         
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqseckdel,reqsecklist } from "../../../util/request";
export default {
  components: {},
   computed: {
    ...mapGetters({
      list: "seck/list",
    }),
  },
  data() {
    return {
      visible:false
    };
  },
  methods: {
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqseckdel({ id: id }).then((res) => {
        alert("角色删除成功");
        this.requestsecklist();
      });
    },
    ...mapActions({
      requestsecklist: "seck/requestsecklist",
    }),
  },
  mounted() {
    this.requestsecklist();
  },
 
  watch: {},
};
</script>
<style >
img {
    width: 80px;
    height: 80px;
}
.cell {
  text-align: center;
}
.el-table {
  margin-top: 30px;
}
</style>