<template>
  <div id="three">
    <input type="file" @change="model" multiple/>
    <div ref="container"></div>
  </div>
</template>

<script>
import { get, remove, post } from "../utilities/rest";
require("three/examples/js/loaders/OBJLoader.js");
require("three/examples/js/loaders/MTLLoader.js");
require("three/examples/js/loaders/DDSLoader.js");
require("three/examples/js/loaders/MMDLoader.js");
const ddsloader = new THREE.DDSLoader();
const mmdloader = new THREE.MMDLoader();
const objLoader = new THREE.OBJLoader();
const mtlLoader = new THREE.MTLLoader();
let scene;

let yami = "/yami.obj";
let yamimtl = "/yami.mtl";
let alice = "../static/alice.pmx";

export default {
  name: "three",
  data() {
    return {};
  },
  created() {},
  mounted() {
    scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.y = 10;

    let cameraPerspectiveHelper = new THREE.CameraHelper(camera);
    // scene.add(cameraPerspectiveHelper);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    let container = this.$refs.container;
    container.appendChild(renderer.domElement);

    var light = new THREE.AmbientLight("#fff");
    light.castShadow = true;
    scene.add(light);

    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1).normalize();
    // scene.add(directionalLight);

    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

    animate();

    function animate() {
      requestAnimationFrame(animate);

      let r = Date.now() * 0.0005;
      camera.position.x = 30 * Math.cos(r);
      camera.position.z = 30 * Math.sin(r);
      camera.lookAt(new THREE.Vector3(0, 10, 0));

      renderer.render(scene, camera);
    }
  },
  computed: {},
  methods: {
    model(e) {
      e.target.files.length > 1 ? multiple() : single();
      function multiple() {
        let files = e.target.files;
        console.log(files);
        let mtlFile, objFile;
        for (let i = 0; i < files.length; i++) {
          let extension = files[i].name.substring(
            files[i].name.lastIndexOf(".") + 1
          );
          if (extension === "mtl") {
            mtlFile = files[i];
          }
          if (extension === "obj") {
            objFile = files[i];
          }
        }
        let mtlReader = new FileReader();
        mtlReader.readAsText(mtlFile);
        mtlReader.onload = () => {
          let mtl = mtlLoader.parse(mtlReader.result);
          mtl.preload();
          let objLoader = new THREE.OBJLoader();
          objLoader.setMaterials(mtl);
          let objReader = new FileReader();
          objReader.readAsText(objFile);
          objReader.onload = () => {
            let obj = objLoader.parse(objReader.result);
            scene.add(obj);
          };
        };
      }

      function single() {
        let file = e.target.files[0];
        let reader = new FileReader();
        let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
        console.log(extension);

        switch (extension) {
          case "pmx":
            reader.readAsArrayBuffer(file);
            reader.onload = () => {
              let builder = mmdloader.meshBuilder;
              let parser = new MMDParser.Parser();
              let obj = builder.build(
                parser.parsePmx(reader.result, true),
                "../static/"
              );
              scene.add(obj);
            };
            break;
          case "obj":
            reader.readAsText(file);
            reader.onload = () => {
              let obj = objLoader.parse(reader.result);
              scene.add(obj);
            };
            break;
        }
      }
    },
    material(e) {
      let file = e.target.files[0];
      let data = new FormData();
      data.append("file", file);
      post("/files", data, {
        headers: { "content-type": "multipart/form-data" }
      }).then(result => {
        console.log(result);
      });
    }
  }
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
