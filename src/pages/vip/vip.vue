<template>
  <div class="">
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
        title: "会员修改",
        isadd: true,
      },
    };
  },
  methods: {
    edit(id) {
      this.info.isshow = true;
      this.info.title = "会员修改";
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