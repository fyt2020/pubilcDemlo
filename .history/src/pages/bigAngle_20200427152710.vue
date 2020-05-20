<template>
    <div class="bigAngle">

        <div class="bigAngle__left">
             <div class="left__top">
                 <img :src="uploadImgUrl" alt="" >

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
                          <img src="" alt="">
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
    props: {

    },
    data() {
        return {
            btnKey:true,
            uploadImgUrl:''

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        uploadFile2(){

        },
        beforeUploadFile2(){

        }

    },
    components: {

    },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/bigAngle.scss";
</style>
