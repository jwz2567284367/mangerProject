<template>
  <div class="">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      
    >
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="180">
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
        
        </template>
      </el-table-column>
    </el-table>
   
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "vip/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    edit(id) {
      this.$emit("edit", id);
    },
    ...mapActions({
      requestmemberlist: "vip/requestmemberlist",     
    }),
  
  },
  mounted() {
    this.requestmemberlist(); 
  },

  watch: {},
};
</script>
<style>
.el-pagination {
  width: 85vw;

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