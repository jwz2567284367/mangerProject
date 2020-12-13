<template>
  <div class="">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="上级分类：" :label-width="width">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级菜单：" :value="0"></el-option>
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称：" :label-width="width">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片：" :label-width="width">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeimg"
          >
            <img v-if="imageurl" :src="imageurl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="状态：" :label-width="width">
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
        <el-button type="primary" @click="add" v-if="info.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexRouters } from "../../../router/index";
import { mapGetters, mapActions } from "vuex";
import { reqcateadd, reqcatelistone, reqcateedit } from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      catelist: "cate/list",
    }),
  },
  data() {
    return {
      width: "150px",
      imageurl: "",
      form: {
        catename: "",
        pid: "",
        img: null,
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
    //--上传图片--
    changeimg(e) {
      console.log(e);
      var file = e.raw;
      this.imageurl = URL.createObjectURL(file);
      this.form.img = file;
    },
    empty() {
      this.form = {
        catename: "",
        pid: "",
        img: null,
        status: 1,
      };
    },
    hide() {
      this.info.isshow = false;
    },
    add() {
      reqcateadd(this.form).then((res) => {
        this.requestcatelist();
        this.hide();
        this.empty();
      });
    },

    ...mapActions({
      requestcatelist: "cate/requestcatelist",
    }),
    // 获取一条数据
    look(id) {
      reqcatelistone({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageurl = this.$preimg + res.data.list.img;
      });
    },
    update() {
      reqcateedit(this.form).then((res) => {
        this.requestcatelist();
        this.hide();
      });
    },
  },
  mounted() {
    this.requestcatelist();
  },

  watch: {},
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>