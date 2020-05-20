<template>
  <div class="home">
     <!-- vue -->

      <div class="header">

           <div class="header__left"></div>
           <div class="header__right"></div>
      </div>
      <div class="navigation">
            <router-link tag="li" to="{name:'bigAngle'}">大角度人脸识别</router-link>
            <router-link tag="li" to="{name:'bigAngle'}">侧脸推正脸</router-link>
      </div>

      <!-- <div class="content">
              <router-view />
      </div> -->
  </div>
</template>

<script>
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



