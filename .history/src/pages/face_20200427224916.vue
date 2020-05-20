<template>
  <div class="face">
    <div class="face__left">
      <canvas class="canvasId" v-show="regImgKey" :class="{'big':isBig}"></canvas>
    </div>

    <div class="face__right">
      <div class="right__top">
        <span class="right__topT">识别结果</span>
        <div id="WebGL-output1"></div>
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
import axios from 'axios'
export default {
  props: {},
  data() {
    return {
      regImgKey: false,
      isBig: false,
      charData: [],
      infoObj: {
        collectNo: "",
        sex: "",
        time: "",
        idNo: ""
      },
      source:0,
      camera: null,
      renderer: null,
      boxHelper: null,
      animationId: null,
      modelObj: null,
      scene: null
    };
  },
  computed: {},
  created() {
    let id = this.$route.params.id;
    if (id) {
    } else {
      this.initData();
    }
  },
  mounted() {},
  methods: {
    initData() {
      let id = this._getQueryString(window.BASEURL.type);
      this.INIT(400,400,id)
    },

    _getQueryString(name) {
      let after = window.location.hash.split("?")[1];
      if (after) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = after.match(reg);

        if (r != null) return unescape(r[2]);
        return null;
      }
    },

    INIT(width, height, name) {
        console.log(name)
      let VM = this;
      //场景构建
      VM.scene = new THREE.Scene();
      //相机构建
      VM.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000); //四个参数 视场角 方向 最近距 最远距  fov对应着图中的视角，是上下两面的夹角。aspect是近平面的宽高比。
      // camera.lookAt( new THREE.Vector3(0, 0, 0));
      //渲染器构建
      VM.renderer = new THREE.WebGLRenderer({
        antialias: true
      });

      //设置背景颜色
      VM.renderer.setClearColor(0x484b5f);
      //三个参数 width height updateStyle第三个选填
      VM.renderer.setSize(width, height);
      //激活阴影
      VM.renderer.shadowMapEnabled = true;
      //添加材质灯光阴影
      var ambiColor = "ffffff";
      var ambientLight = new THREE.AmbientLight(ambiColor);
      VM.scene.add(ambientLight);

      //添加坐标系
      // var axes = new THREE.AxisHelper(100);
      // scene.add(axes);

      //添加网格
      // var helper = new THREE.GridHelper( 1000, 50 ,0x0000ff, 0xff8080);
      // scene.add(helper);
      VM.boxHelper = new THREE.BoxHelper();

      var controls = new THREE.OrbitControls(VM.camera, VM.renderer.domElement);
      //controls.target = new THREE.Vector3(0, 0, 0);
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      controls.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      controls.dampingFactor = 0.25;
      //是否可以缩放
      controls.enableZoom = true;
      //是否自动旋转
      controls.autoRotate = false;
      //设置相机距离原点的最近距离
      //controls.minDistance = 200;
      //设置相机距离原点的最远距离
      //controls.maxDistance = 600;
      //是否开启右键拖拽
      controls.enablePan = true;
      //上下旋转范围
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = Math.PI * (90 / 180);
      //左右旋转范围
      controls.minAzimuthAngle = -Math.PI * (60 / 180);
      controls.maxAzimuthAngle = Math.PI * (60 / 180);

      controls.panSpeed = 0.2;
      controls.rotateSpeed = 0.1;
      //模型
      var onProgress = function(xhr) {
        // if (xhr.lengthComputable) {
        //   //可计算的长度
        //   var percentCompvare = (xhr.loaded / xhr.total) * 100; //加载程度百分比
        //   var elem = document.getElementById("myBar");
        //   var width = parseInt(percentCompvare);
        //   elem.style.width = width + "%";
        //   $(".loading").text("正在下载:" + parseInt(percentCompvare) + "%");
        // }
      };
      var onError = function(xhr) {
        // $(".loading")
        //   .show()
        //   .text("下载失败");
        return;
      };

      var modelPath = `../../static/data/${name}`;
      var objLoader = new THREE.OBJLoader2();
      var callbackOnLoad = function(event) {
        VM.modelObj = event.detail.loaderRootNode;
        VM.modelObj.name = `${name}`;
        VM.modelObj.scale.set(1.9, 1.9, 1.9);
        VM.modelObj.children[0].geometry.computeBoundingBox();
        VM.modelObj.rotation.x = THREE.Math.degToRad(-88);
        VM.modelObj.children[0].geometry.center();
        VM.boxHelper.setFromObject(VM.modelObj);
        let center = VM.boxHelper.geometry.boundingSphere.center;
        let radius = VM.boxHelper.geometry.boundingSphere.radius;
        let cameraPos = new THREE.Vector3(
          center.x + VM.modelObj.position.x,
          center.y + VM.modelObj.position.y,
          radius * 2.2 + center.z + VM.modelObj.position.z
        );
        let lookPos = new THREE.Vector3(
          center.x + VM.modelObj.position.x,
          center.y + VM.modelObj.position.y,
          center.z + VM.modelObj.position.z
        );
        VM.camera.position.copy(cameraPos);
        controls.target = lookPos;
        VM.camera.lookAt(lookPos);
        VM.scene.add(VM.modelObj);
      };
      let typeObj = VM.source == "1" ? "textured" : "cut";
      objLoader.loadMtl(modelPath + `/${typeObj}_mesh.mtl`, null, function(
        materialCreator
      ) {
        materialCreator[`${typeObj}_mesh`].opacity = 1; // new THREE.Color(1,1,1)
        objLoader.setMaterials(materialCreator);
        objLoader.setLogging(true, true);
        objLoader.load(
          modelPath + `/${typeObj}_mesh.obj`,
          callbackOnLoad,
          onProgress,
          onError,
          null,
          false
        );
      });
      VM.camera.lookAt(VM.scene.position);
      //在页面上添加渲染器，dom元素
      console.log($)
      $("#WebGL-output1").append(VM.renderer.domElement);
      renderScene();
      VM.getModelTxt(name);
      VM.getInfo(name)
      function renderScene() {
        var clock = new THREE.Clock();
        var delta = clock.getDelta(); //三角点
        controls.update();
        VM.camera.updateProjectionMatrix();
        VM.animationId = requestAnimationFrame(renderScene); //请求动画框架
        VM.renderer.render(VM.scene, VM.camera);
      }
    },
    clearRenderer() {
      let VM = this;
      VM.renderer.dispose();
      VM.renderer.forceContextLoss();
      VM.renderer.context = null;
      VM.renderer.domElement = null;
      VM.renderer = null;
    },
    getModelTxt(name) {
      let VM = this;
      let id = new Date().getTime();
      let params = {
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        responseType: "text/json",
        inCharset: "utf-8",
        outCharset: "utf-8",
        timeout: 30000,
        random: id
      };
      axios
        .get(`../../static/data/${name}/face_points_distance.txt`)
        .then(function(res) {
          let newData = res.data.split("\r\n");
          let len = newData.length;
          for (var i = 0; i < len; i++) {
            let obj = {};
            if (newData[i]) {
              let k = newData[i].split(":")[0];
              let v = newData[i].split(":")[1];
              obj["title"] = k;
              obj["value"] = v;
            }
            VM.charData.push(obj);
          }

          console.log(VM.charData);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getInfo(name) {
      let VM = this;
      this.$http.api
        .get(`../../static/data/${name}/${name}.json`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result;
            VM.infoObj = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //移除模型
    removeEntity(object) {
      let selectedObject = this.scene.getObjectByName(object.name);
      // console.log('renderer.renderLists',this.renderer.renderLists)
      selectedObject.traverse(function(item) {
        if (item instanceof THREE.Mesh) {
          item.geometry.dispose(); //删除几何体
          //item.material.dispose(); //删除材质
          if (Array.isArray(item.material)) {
            item.material.forEach(function(i) {
              i.dispose(); //删除材质
            });
          } else {
            item.material.dispose();
          }
        }
      });
      this.scene.remove(selectedObject);
      this.renderer.dispose();
      this.renderer.clear();
      this.renderer.renderLists.dispose();
      this.modelObj = null;
      THREE.Cache.clear();
    }
  },
  components: {},
  beforeDestroy() {}
};
</script>

<style scoped lang="scss">
@import "@/assets/css/face.scss";
</style>
