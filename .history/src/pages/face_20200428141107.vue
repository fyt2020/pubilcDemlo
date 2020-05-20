<template>
  <div class="face">
    <div class="face__left">
      <div class="left__top">
        <div class="titleW" v-if="btnKey">
          <span class="titleW__one"></span>
          <span class="titleW__w">上传照片</span>
        </div>
        <canvas class="canvasId" v-show="regImgKey" :class="{'big':isBig}"></canvas>
        <img
          src="../assets/img/delete.png"
          alt
          class="delete__img"
          v-show="closeKey"
          @click="close"
        />
        <button class="btn" @click="uploadFile2" v-if="btnKey">
          <img src="../assets/img/midle.png" alt class="btn__bg" />
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
    </div>
    <div class="face__right">
      <div class="right__top">
        <div class="titleW" v-if="btnKey">
          <span class="titleW__one"></span>
          <span class="titleW__w">识别结果</span>
        </div>
        <img :src="frontImg" alt="" class="front__img" v-if="frontImg">
        <ul class="info__box" v-if="infoObj.collectNo">
          <li class="info__item">
            <span class="info__iteml">姓名:</span>
            <span class="info__itemr">{{infoObj.username}}</span>
          </li>
          <li class="info__item">
            <span class="info__iteml">性别:</span>
            <span class="info__itemr">{{infoObj.sex}}</span>
          </li>
          <li class="info__item">
            <span class="info__iteml">采集编号:</span>
            <span class="info__itemr">{{infoObj.collectNo}}</span>
          </li>

          <li class="info__item">
            <span class="info__iteml">证件号:</span>
            <span class="info__itemr">{{infoObj.idNo}}</span>
          </li>
          <li class="info__item">
            <span class="info__iteml">采集时间:</span>
            <span class="info__itemr">{{infoObj.time}}</span>
          </li>
        </ul>
      </div>
      <div class="right__bottom">
        <div class="titleW" v-if="btnKey">
          <span class="titleW__one"></span>
          <span class="titleW__w">体量特征</span>
        </div>
        <img src="../assets/img/char.jpg" alt="" class="char">
        <ul class="tl__box" v-if="charData.length>0">
          <li class="tl__item" v-for="item in charData" :key="item.value">
            <span class="tl__iteml same">{{item.title}}</span>
            <span class="tl__itemr same">{{Number(item.value).toFixed(2)}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {},
  data() {
    return {
      btnKey: true,
      uploadImgUrl: "",
      regImgKey:false,
      closeKey: false,
      isBig:true,
      infoObj: {
        collectNo: "",
        sex: "",
        time: "",
        idNo: ""
      },
      frontImg:"",
      charData: [],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    close() {
      this.regImgKey=false;
      this.uploadImgUrl = "";
      this.frontImg = "",
      this.closeKey = false;
      this.btnKey = true;
      this.charData = [];
      this.infoObj = {
        collectNo: "",
        sex: "",
        time: "",
        idNo: ""
      };
    },
    uploadFile2() {
      let file = document.getElementById("upload_file2");
      file.click();
    },
    beforeUploadFile2(e) {
      let VM = this;
      let files = e.target.files[0];
      let name = e.target.files[0].name;
      console.log(name)
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
      let reader = new FileReader();
      reader.onloadend = function() {
        VM.uploadImgUrl = reader.result;
        VM.getInfo(startName, VM.uploadImgUrl );
        VM.getModelTxt(startName)
      };
      reader.readAsDataURL(files);
   
     
    },
    //画框
      createdImg(imgUrl1, data) {
      let len = data.length;
      let canvas = document.getElementsByClassName("canvasId")[0];
      let ctx = canvas.getContext("2d");
      let img = new Image();
      img.src = `${imgUrl1}`;
      let spX, spY;
      let W = $(".face__left").width();
      let H = $(".face__left").height();
      img.onload = function() {
        let imgW = img.width;
        let imgH = img.height;
        let targetW, targetH;
        spX = W / img.width;
        spY = H / img.height;
        console.log(img.width);
        console.log(img.height);
        if (imgW > W) {
          targetW = imgW * spX;
          targetH = imgH * spX;
          if (imgH > H) {
            targetW = imgW * spY;
            targetH = imgH * spY;
          }
        } else {
          if (imgH > H) {
            targetW = imgW * spY;
            targetH = imgH * spY;
          } else {
            targetW = imgW;
            targetH = imgH;
          }
        }
        // console.log(spX);
        // console.log(spY);
        // console.log(targetW);
        // console.log(targetH);

        canvas.width = targetW;
        canvas.height = targetH;

        ctx.drawImage(img, 0, 0, targetW, targetH);
        ctx.strokeStyle = "#FF0000";
        ctx.strokeWidth = 1;
        ctx.lineWidth = 2;
        if (len > 0) {
          if (imgW > W && imgH < H) {
            console.log(1);
            data.forEach((item, index) => {
              ctx.strokeRect(
                item.x * spX,
                item.y * spX,
                item.w * spX,
                item.h * spX
              );
            });
          } else if (imgW > W && imgH > H) {
            console.log(2);
            data.forEach((item, index) => {
              ctx.strokeRect(
                item.x * spY,
                item.y * spY,
                item.w * spY,
                item.h * spY
              );
            });
          } else {
            if (imgH > H) {
              console.log(3);
              data.forEach((item, index) => {
                ctx.strokeRect(
                  item.x * spY,
                  item.y * spY,
                  item.w * spY,
                  item.h * spY
                );
              });
            } else {
              console.log(4);
              data.forEach((item, index) => {
                ctx.strokeRect(item.x, item.y, item.w, item.h);
              });
            }
          }
        }
      };
    },

   
   
    getModelTxt(name) {
      let VM = this;
      let id = new Date().getTime();
      let params = {
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        responseType: "text/json",
        inCharset: "utf-8",
        outCharset: "utf-8",
        timeout: 30000,
        random: id
      };
      axios
        .get(`/static/data/${name}/face_points_distance.txt`)
        .then(function(res) {
          let newData = res.data.split("\r\n");
          let len = newData.length;
          for (var i = 0; i < len; i++) {
            if (newData[i]) {
              let obj = {};
              let k = newData[i].split(":")[0];
              let v = newData[i].split(":")[1];
              obj["title"] = k;
              obj["value"] = v;
              VM.charData.push(obj);
            }
          }
          console.log( VM.charData)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getInfo(name,imgUrl) {
      let VM = this;
      this.$http.api
        .get(`/static/data/${name}/${name}.json`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result;
            VM.infoObj = data;
            VM.regImgKey = true;
            VM.frontImg = `recg/static/data/${name}/front.jpg`
            console.log('frontImg',VM.frontImg )
            VM.createdImg(imgUrl,data.xdata)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  beforeDestroy() {},
  components: {}
};
</script>

<style scoped lang="scss">
@import "@/assets/css/face.scss";
</style>
