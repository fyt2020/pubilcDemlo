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

    },
    components: {

    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/home.scss';
</style>



