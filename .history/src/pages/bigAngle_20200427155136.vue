<template>
  <div class="bigAngle">
    <div class="bigAngle__left">
      <div class="left__top">
        <img :src="uploadImgUrl" alt class="uploadImg" v-if="uploadImgUrl" />

        <button class="btn" @click="uploadFile2" v-if="btnKey">
          导入图片
          <form
            name="fileList"
            id="fileList"
            action="uploadURL"
            method="POST"
            enctype="multipart/form-data"
            class="file"
          >
            <input
              type="file"
              hidden
              @change="beforeUploadFile2($event)"
              id="upload_file2"
              class="file-inp"
            />
          </form>
        </button>
      </div>
      <div class="left__bottom">
        <ul class="recg__box">
          <li class="recg__item">
            <img src alt />
          </li>
        </ul>
      </div>
    </div>
    <div class="bigAngle__right">
      <div class="right__top"></div>
      <div class="right__bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      btnKey: true,
      uploadImgUrl: "",
      closeKey:false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    uploadFile2() {
      let file = document.getElementById("upload_file2");

      file.click();
    },
    beforeUploadFile2(e) {
      let VM = this;
      let files = e.target.files[0];
      let nameArr = e.target.files[0].name.split(".");
      let len = nameArr.length;
      let startName = e.target.files[0].name.split(".")[0];
      let endName = nameArr[len - 1];
      if (
        endName != "jpg" &&
        endName != "png" &&
        endName != "jpeg" &&
        endName != "JPG" &&
        endName != "PNG" &&
        endName != "JPEG"
      ) {
        VM.$Message.error(`上传图片格式不是jpg或png!`);
        return;
      }
      if (!files) {
        return;
      }
      this.btnKey = false;
      this.closeKey = true;
      let reader  = new FileReader();
      reader.onloadend = function(){
          VM.uploadImgUrl = reader.result
      }
      reader.readAsDataURL(files);
    //   console.log(startName);
    //   console.log(files)
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "@/assets/css/bigAngle.scss";
</style>
