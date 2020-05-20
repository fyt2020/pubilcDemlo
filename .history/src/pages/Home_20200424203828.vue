<template>
    <div class="home">

        vue

    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {

        };
    },
    computed: {

    },
    created() {

      let aio = axios.create({})

       console.log(aio)

    },
    mounted() {

    },
    methods: {

        getUserAccount() {
  return axios.get('/user/12345');
},

getUserPermissions() {
  return axios.get('/user/12345/permissions');
},

 get(){

     axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));

 }



    },
    components: {

    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/home.scss';
</style>



