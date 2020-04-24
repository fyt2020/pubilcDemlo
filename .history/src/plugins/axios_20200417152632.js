import axios from 'axios'
import qs from 'qs'
import router from '../router'
import baseOss from '../../static/baseOss.js'
let axiosIns = axios.create({});
if (process.env.NODE_ENV == 'development') {
  axiosIns.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'debug') {
  axiosIns.defaults.baseURL = '***';
} else if (process.env.NODE_ENV == 'production') {
  axiosIns.defaults.baseURL = baseOss.ossUrl;
}
// console.log(axiosIns.defaults.baseURL)

axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.responseType = 'json';
axiosIns.defaults.timeout = 15000;

/*axiosIns.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';*/
// axiosIns.defaults.headers.post['Content-Type'] = 'application/json';
/*axiosIns.defaults.transformRequest = [function (data) {
  //数据序列化
  return qs.stringify(data);
}
];*/
axiosIns.defaults.validateStatus = function (status) {
  return true;
};


axiosIns.interceptors.request.use(function (config) {
  //配置config
  config.headers.Accept = '*/*';
  if (config.ContentType === "form") {
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    config.data = qs.stringify(config.data);
  }
    //config.headers.accessToken = "d11d29fbaee74a379a694ce68396bc6a";//accessToken;
  if (window.localStorage.getItem('token')) {
    let token = window.localStorage.getItem('token');
    let accessToken = JSON.parse(token).accessToken;
    config.headers.accessToken = accessToken;
  }
  config.headers.projectId = "police_v1";
  return config;
});

axiosIns.interceptors.response.use(function (response) {
  // console.log(response);
  let data = response.data;
  let status = response.status;
  // console.log(status);
  if (status === 200 || status === 201 || status === 202) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }

});

let ajaxMethod = ['get', 'post', 'delete', "put"];
let api = {};
ajaxMethod.forEach((method) => {
  //数组取值的两种方式
  api[method] = function (uri, data, config) {
    return new Promise(function (resolve, reject) {
      axiosIns[method](uri, data, config).then((response) => {
        // console.log(response)
        /*根据后台数据进行处理
         *1 code===200   正常数据+错误数据     code!==200   网络异常等
         *2 code===200   正常数据     code!==200   错误数据+网络异常等
         * 这里使用的是第一种方式
         * ......
         */
        // console.log(response)
        if(response.status === 201 || response.status === 202)resolve(response);
        if (response.data.code === 11030110 || response.data.code === 11030113 || response.data.code === 11030111 || response.data.code === 11030112) {
          console.log('token失效')
          let key = window.confirm('token失效,需要重新登陆!');
          if(key){
              router.push({name: "login"})
          }else{

              
          }
         
          
        } else {
          resolve(response);
        }
        /*if (response.data.StatusCode) {
          //toast封装：  参考ele-mint-ui
          Toast({
            message: response.data.Message,
            position: 'top',
            duration: 6000
          });
          if (response.data.Message === '未登录') {
            Toast({
              message: response.data.Message,
              position: '',
              duration: 6000
            });
            //使用vue实例做出对应行为  change state or router
            //instance.$store.commit('isLoginShow',true);
          }
        } else {
          resolve(response);
        }*/
      }).catch((response) => {
        reject(response)
        //reject response
        //alert('xiuxiu，限你10分钟到我面前来,不然...');
      })
    })

  }
});

export default {
  api
}
/*
this.prototype.$axios = api;

//.....
let instance =new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
});*/

/* 1 根据process.env.NODE_ENV 获取对应的apiDomain
 * 2 处理ajax库axios，为了以后不重复引用，挂在原型对象上
 * 3 axios是封装在main.js里面的，是为了获取vue实例操作store、router
 * 4 组件里面使用this.$axios.get or  this.$axios.post 调用  使用debugger，查看接口返回数据的走向
 */
