<template>
  <div class="">
    <el-button type="primary" @click="willadd">添加</el-button>

    <v-add :info="info" ref="one"></v-add>

    <v-list @edit="edit($event)"></v-list>
  </div>
</template>

<script>
import vList from "./componets/list";
import vAdd from "./componets/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        title: "商品管理添加",
        isadd: true,
      },
    };
  },
  methods: {
   
    
    willadd() {
      this.info.isshow = !this.info.isshow;
      this.info.title = "商品管理添加";
      this.info.isadd = true;
       this.$refs.one.empty()
    },
    edit(id) {
      this.info.isshow = true;
      this.info.title = "商品管理修改";
      this.info.isadd = false;
      this.$refs.one.look(id);
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>
<style>
</style>