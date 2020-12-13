<template>
  <div class="">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="标题：" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
// import { indexRouters } from "../../../router/index";
import { mapGetters, mapActions } from "vuex";
import { reqbanneradd, reqbannerlistone, reqbanneredit } from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      bannerlist: "banner/list",
    }),
  },
  data() {
    return {
      width: "150px",
      imageurl: "",
      form: {
        title: "",
        
        img: null,
        status: 1,
      },
      // indexRouters: indexRouters,
      // data: [],
      // defaultProps: {
      //   children: "children",
      //   label: "label",
      // },
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
         title: "",
        
        img: null,
        status: 1,
      };
    },
    hide() {
      this.info.isshow = false;
    },
    add() {
      reqbanneradd(this.form).then((res) => {
        this.requestbannerlist();
        this.hide();
        this.empty();
      });
    },

    ...mapActions({
      requestbannerlist: "banner/requestbannerlist",
    }),
    // 获取一条数据
    look(id) {
      reqbannerlistone({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageurl = this.$preimg + res.data.list.img;
      });
    },
    update() {
      reqbanneredit(this.form).then((res) => {
        this.requestbannerlist();
        this.hide();
      });
    },
  },
  mounted() {
    this.requestbannerlist();
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