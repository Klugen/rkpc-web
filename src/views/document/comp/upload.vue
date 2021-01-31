<template>
  <div>
    <el-upload
      v-if="!ImgUrl"
      accept="image/jpeg,image/gif,image/png,image/jpg"
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      class="image-uploader"
      drag
      action="http://localhost:8080/hk/uploadfile"
      :title="CardTypeName"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        <em>{{ CardTypeName }}</em
        >图片文件拖到此处，或<em>点击上传</em>
      </div>
    </el-upload>

    <el-image
      v-else
      :src="ImgUrl"
      style="width: 100%; height: 600px"
      fit="scale-down"
    ></el-image>
  </div>
</template>

 <script>
import store from "@/store";
export default {
  name: "SingleImageUpload",
  props: {
    CardType: {
      type: String,
      default: "",
    },
    CardTypeName: {
      type: String,
      default: "",
    },
    PersonId: {
      type: String,
      default: "",
    },
    ImgUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tempUrl: "",
      dataObj: {
        token: store.getters.token,
        key: "",
        cardType: this.CardType,
        personId: this.PersonId,
      },
    };
  },
  computed: {
    imageUrl() {
      return this.value;
    },
  },
  methods: {
    rmImage() {
      this.emitInput("");
    },
    emitInput(val) {
      this.$emit("input", val);
    },
    handleImageSuccess(response,file,filelist) {
      console.log("图片上传成功回调");
      console.log(response);
      console.log(file);
      console.log(filelist);
      //this.emitInput(this.tempUrl);
    },
    beforeUpload() {
      const _self = this;
      const token = store.getters.token;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;
  .image-uploader {
    width: 60%;
    float: left;
  }
  .image-preview {
    width: 200px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
