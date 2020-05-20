<template>
  <div class="home">

      <div class="header">

      </div>
      <div class="navigation">
            <router-link tag="li">大角度人脸识别</router-link>
            <router-link tag="li">侧脸推正脸</router-link>
      </div>

      <div class="content">

            <router-view/>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  computed: {},
  created() {
     
  },
  mounted() {
   
  },
  methods: {
    
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/home.scss";
</style>



