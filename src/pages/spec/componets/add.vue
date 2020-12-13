<template>
  <div class="">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="规格名称：" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性："
          :label-width="width"
          v-for="(item, index) in arrattr"
          :key="index"
        >
          <el-row>
            <el-col :span="18">
              <el-input v-model="item.value" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" v-if="index == 0" @click="addattr"
                >新增规格属性</el-button
              >
              <el-button type="danger" v-else @click="delattr(index)"
                >删除</el-button
              >
            </el-col>
          </el-row>
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
import {
  reqspecsadd,
  reqspecslistone,
  reqspecsedit,
} from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
        specslist: "specs/list",
    }),
  },
  data() {
    return {
      width: "150px",
      arrattr: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "",
        attrs: "",
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
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
    },
    hide() {
      this.info.isshow = false;
    },
    add() {
      this.form.attrs = JSON.stringify(
        this.arrattr.map((item) => {
          return item.value;
        })
      );
      reqspecsadd(this.form).then((res) => {
        this.requestcatelist();
        this.requestspecslist();
        this.hide();
        this.empty();
      });
    },
    // 新增属性
    addattr() {
      this.arrattr.push({
        value: "",
      });
    },
    // 删除属性
    delattr(index) {
      this.arrattr.splice(index, 1);
    },
    ...mapActions({
      requestcatelist: "cate/requestcatelist",
      requestspecslist: "specs/requestspecslist",
    }),
    // 获取一条数据
    look(id) {
      reqspecslistone({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.form.id = id;
        console.log(this.form);
        this.arrattr = JSON.parse(this.form.attrs).map((item) => {
          return { value: item };
        });
      });
    },
    update() {
      this.form.attrs = JSON.stringify(
        this.arrattr.map((item) => {
          return item.value;
        })
      );
      reqspecsedit(this.form).then((res) => {
        this.requestcatelist();
        this.requestspecslist();
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