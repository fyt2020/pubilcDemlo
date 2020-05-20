<template>
  <div class="home">
     <!-- vue -->

      <div class="header">

           <div class="header__left">
                <img src="" alt="">
                <span>雪山云</span>
           </div>
           <div class="header__right">
                <span>雪山云</span>
           </div>
      </div>
      <div class="navigation">
            <span>三维人像应用:</span>
            <router-link tag="li" :to="{name:'bigAngle'}" class="navigation__item">大角度人脸识别</router-link>
            <router-link tag="li" :to="{name:'face'}">侧脸推正脸</router-link>
      </div>

      <div class="content">
              <router-view />
      </div>

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



