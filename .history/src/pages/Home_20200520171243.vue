<template>
  <div class="home">
      <div class="header">
           <div class="header__left"> 
                 <span>智慧刑侦-三维人像应用</span>
                <!-- <img src="../assets/img/logo1.png" alt="" class="logo_img"> -->
           </div>
           <div class="header__right">
                <!-- <span>武汉天远视科技</span> -->
           </div>
      </div>
      <div class="navigation">
            <span class="navigation__title">三维人像应用:</span>
            <router-link tag="li" :to="{name:'bigAngle'}" class="navigation__item">大角度人脸识别</router-link>
            <router-link tag="li" :to="{name:'face',params:{id:'self'}}" class="navigation__item">侧脸推正脸</router-link>
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



