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
      <el-table-column prop="id" label="编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="轮播图标题" sortable width="180">
      </el-table-column>
      <el-table-column  label="图片" sortable width="180">
           <template slot-scope="scope">
          <img :src="$preimg+scope.row.img" alt="">
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
import { reqbannerdel, } from "../../../util/request";
export default {
  components: {},
   computed: {
    ...mapGetters({
      list: "banner/list",
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
      reqbannerdel({ id: id }).then((res) => {
        alert("轮播图删除成功");
        this.requestbannerlist();
      });
    },
    ...mapActions({
      requestbannerlist: "banner/requestbannerlist",
    }),
  },
  mounted() {
    this.requestbannerlist();
  },
 
  watch: {},
};
</script>
<style >
img {
    width: 80px;
    height: 80px;
}
</style>