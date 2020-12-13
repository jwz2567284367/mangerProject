<template>
  <div class="">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="活动名称：" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限：" :label-width="width">
         <div class="block">
    <el-date-picker
      v-model="formData.createTime"
      type="datetimerange"
      align="right"
      unlink-panels
      value-format
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '00:00:00']">
    </el-date-picker>
  </div>
          
        </el-form-item>
        <el-form-item label="一级分类：" :label-width="width">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changecate"
          >
            <el-option label="请选择" disabled :value="0"></el-option>
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类：" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option label="请选择" disabled :value="0"></el-option>
            <el-option
              v-for="item in secondcate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品：" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option label="请选择" disabled :value="0"></el-option>
            <el-option
              v-for="item in secondcate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
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
import { reqseckadd, reqsecklistone, reqseckedit } from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      catelist: "cate/list",
      speclist: "specs/list",
      secklist: "seck/list",
    }),
  },
  data() {
    return {
      width: "150px",
      secondcate: [], //存放二级分类
      secondspec: [], //存放规格属性
      form: {
        first_cateid: 0,
        second_cateid: 0,
        title: "",
        begintime: "",
        endtime: "",
        goodsid: "",
        status: 1,
      },
formData: {
        createTime: [],
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
    empty() {
      this.form = {
        first_cateid: 0,
        second_cateid: 0,
        title: "",
        begintime: "",
        endtime: "",
        goodsid: "",
        status: 1,
      };
    },
    hide() {
      this.info.isshow = false;
    },

    // 修改二级分类
    changecate() {
      this.secondcate = this.catelist.find((item) => {
        return item.id == this.form.first_cateid;
      }).children;
    },
    // 修改规格属性
    changespec() {
      this.form.specsattr = [];
      this.secondspec = this.speclist.find((item) => {
        return item.id == this.form.specsid;
      }).attrs;
    },
    add() {
      reqseckadd(this.form).then((res) => {
        this.requestsecklist();
        this.hide();
        this.empty();
      });
    },

    ...mapActions({
      requestcatelist: "cate/requestcatelist",
      requestspecslist: "specs/requestspecslist",
      requestsecklist: "seck/requestsecklist",
    }),
    // 获取一条数据
    look(id) {
      reqsecklistone({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageurl = this.$preimg + res.data.list.img;
        // 分割取回的数据
        this.form.specsattr = this.form.specsattr.split(",");
      });
    },
    update() {
      
      reqseckedit(this.form).then((res) => {
        this.requestsecklist();
        this.hide();
      });
    },
  },
  mounted() {
    this.requestcatelist();
    this.requestspecslist();
    // this.requestsecklist();
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