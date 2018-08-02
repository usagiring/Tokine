<template>
  <div id="three">
      <div ref="container"></div>
  </div>
</template>

<script>
import { get, remove } from "../utilities/rest";
require("three/examples/js/loaders/OBJLoader.js");
require("three/examples/js/loaders/MTLLoader.js");
const objLoader = new THREE.OBJLoader();
const mtlLoader = new THREE.MTLLoader();

let yami = "/yami.obj";
let yamimtl = "/yami.mtl";

export default {
  name: "three",
  data() {
    return {};
  },
  created() {},
  mounted() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    let container = this.$refs.container;
    container.appendChild(renderer.domElement);

    var light = new THREE.AmbientLight("#fff");
    // light = new THREE.PointLight(0xffffff);
    // light.position.set(0, 50, 0);

    //告诉平行光需要开启阴影投射
    light.castShadow = true;
    scene.add(light);

    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1).normalize();
    scene.add(directionalLight);

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);

    // var mtlLoader = new THREE.MTLLoader();
    //    var manager = new THREE.LoadingManager();
    mtlLoader.setPath("../static/");
    mtlLoader.load("yami.mtl", function(matl) {
      matl.preload();
      objLoader.setMaterials(matl);
      objLoader.setPath("../static/");
      objLoader.load(
        "yami.obj",
        function(object) {
          scene.add(object);
        },
        function(xhr) {
          console.log(xhr.loaded / xhr.total * 100 + "% loaded");
        }
      );
    });

    // var object = loader.parse(yami);
    // scene.add(object);

    camera.position.z = 5;

    animate();

    function animate() {
      requestAnimationFrame(animate);

      //   cube.rotation.x += 0.01;
      //   cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }
  },
  computed: {},
  methods: {}
};
</script>

<style scoped lang="scss">
body {
  margin: 0;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
