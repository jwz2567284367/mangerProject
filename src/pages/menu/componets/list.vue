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
  
      <el-table-column prop="id" label="菜单编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态">
         <template slot-scope="scope">
          <el-button type='primary' v-if='scope.row.status==1'>启用</el-button>
          <el-button type='danger' v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type='primary' @click="edit(scope.row.id)">编辑</el-button>
          <el-button type='danger' @click='del(scope.row.id)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<div>   {{list}}</div>
  </div> 
</template> 

<script>
import { mapGetters, mapActions } from "vuex";
import {reqmenudel} from '../../../util/request'
export default {
  components: {},
  data() {
    return {
    
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      requestmenulist: "menu/requestmenulist",
    }),
    edit(id) {
      // 编辑
      this.$emit("edit", id);
    },
    // 删除
    del(id){
reqmenudel({id:id}).then(res=>{
    alert("删除成功");
    this.requestmenulist();
})
    }
    
  },
  mounted() {
    this.requestmenulist();
  },

  watch: {},
};
</script>
<style>
</style>