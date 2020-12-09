<template>
  <div class="">
    <el-button type="primary" @click="willadd()">添加</el-button>
    <v-add :info="info" ref="one"></v-add>
    <v-list @edit="edit($event)"></v-list>
  </div>
</template>

<script>
import vAdd from "./componets/add";
import vList from "./componets/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isshow: false,
        title: "菜单添加",
        isadd: true,
      },
    };
  },
  methods: {
    // 添加
    willadd() {
      this.info.isshow =!this.info.isshow;
      this.info.isadd = true;
      this.info.title="菜单添加"
      this.$refs.one.empty()
    },
    // 编辑
    edit(e) {
      // this.info.isshow = true;
      // this.info.isadd = false;
      this.info={
        isshow : true,
        isadd :false,
        title:"菜单编辑"
      }
      console.log(this.$refs.one);
      this.$refs.one.look(e);
      
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>
<style>
.el-table {
  margin-top: 30px;
}
</style>