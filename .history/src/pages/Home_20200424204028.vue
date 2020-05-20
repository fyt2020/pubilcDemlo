<template>
  <div class="home">vue</div>
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
      this.get()
  },
  methods: {
    getUserAccount() {
      return this.$http.api.get("../../static/data/model.json");
    },

    getUserPermissions() {
      return this.$http.api.get("../../static/data/model.json");
    },

    get() {
    let VM = this;
      axios.all([VM.getUserAccount(), VM.getUserPermissions()]).then(
        axios.spread(function(acct, perms) {
            console.log(acct)
            console.log(perms)
          // 两个请求现在都执行完成
        })
      );
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/home.scss";
</style>



