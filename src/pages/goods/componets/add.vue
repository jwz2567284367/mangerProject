<template>
  <div class="">
    <el-dialog
      :title="info.title"
      :visible.sync="info.isshow"
      @opened="changeeditor"
    >
      <el-form :model="form">
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
        <el-form-item label="商品名称：" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格：" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格分类名称：" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
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
        <el-form-item label="商品规格：" :label-width="width">
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="changespec"
          >
            <el-option label="请选择" disabled :value="0"></el-option>
            <el-option
              v-for="item in speclist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性:" :label-width="width">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option label="请选择" disabled :value="0"></el-option>
            <el-option
              v-for="item in secondspec"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="受否新品:" :label-width="width">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖:" :label-width="width">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
        <el-form-item label="商品描述:" :label-width="width">
          <div id="div1" v-if="info.isshow"></div>
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
// 引入富文本编辑器
import E from "wangeditor";
import { indexRouters } from "../../../router/index";
import { mapGetters, mapActions } from "vuex";
import {
  reqgoodsadd,
  reqgoodslistone,
  reqgoodsedit,
} from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      catelist: "cate/list",
      speclist: "specs/list",
    }),
  },
  data() {
    return {
      width: "150px",
      imageurl: "",
      secondcate: [], //存放二级分类
      secondspec: [], //存放规格属性
      form: {
        first_cateid: 0,
        second_cateid: 0,
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: 0,
        specsattr: [],
        isnew: 1,
        ishot: 1,
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
    // 页面加载完成创建富文本编辑器
    changeeditor() {
      this.editor = new E("#div1");
      this.editor.create();
       this.editor.txt.html(this.form.description)
    },
    empty() {
      this.form = {
        first_cateid: 0,
        second_cateid: 0,
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: 0,
        specsattr: [],
        isnew: 1,
        ishot: 1,
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
      this.form.description=this.editor.txt.html()
      reqgoodsadd(this.form).then((res) => {
        this.requestgoodslist();
        this.hide();
        this.empty();
      });
    },

    ...mapActions({
      requestcatelist: "cate/requestcatelist",
      requestspecslist: "specs/requestspecslist",
      requestgoodslist: "goods/requestgoodslist",
    }),
    // 获取一条数据
    look(id) {      
      reqgoodslistone({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageurl = this.$preimg + res.data.list.img;
        // 分割取回的数据
        this.form.specsattr = this.form.specsattr.split(",");
      });
    },
    update() {
      this.form.description=this.editor.txt.html()
      reqgoodsedit(this.form).then((res) => {
        this.requestgoodslist();
        this.hide();
      });
    },
  },
  mounted() {
    this.requestcatelist();
    this.requestspecslist();
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