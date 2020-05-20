<template>
  <div class="face">
    <div class="face__left">

           <canvas class="canvasId" v-show="regImgKey" :class="{'big':isBig}"></canvas>


    </div>

    <div class="face__right">
      <div class="right__top">
        <span class="right__topT">识别结果</span>
        <div id="WebGL-output"></div>
        <ul class="info__box" v-if="infoObj.collectNo">
          <li class="info__item">
            <span class="info__iteml">采集编号:</span>
            <span class="info__itemr">{{infoObj.collectNo}}</span>
          </li>
          <li class="info__item">
            <span class="info__iteml">性别:</span>
            <span class="info__itemr">{{infoObj.sex}}</span>
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
        <span class="right__topT">体量特征</span>
        <ul class="tl__box" v-if="charData.length>0">
          <li class="tl__item" v-for="item in charData" :key="item.value">
            <span class="tl__iteml same">{{item.title}}</span>
            <span class="tl__itemr same">{{item.value}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      regImgKey:false
      charData: [],
      infoObj: {
        collectNo: "",
        sex: "",
        time: "",
        idNo: ""
      },
      renderer: null,
      boxHelper: null,
      animationId: null,
      modelObj: null,
      scene: null
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  components: {},
  beforeDestroy(){

  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/face.scss";
</style>
