<template>
  <div class="demo">
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from "three";
let camera, scene2, renderer2;
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  methods: {
    init() {
      camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.set(1000, 50, 1500);

      scene2 = new THREE.Scene();
      scene2.background = new THREE.Color(0xcce0ff);
      scene2.fog = new THREE.Fog(0xcce0ff, 500, 10000);

      const loader = new THREE.TextureLoader();
      const groundTexture = loader.load(require("@/assets/grasslight-big.jpg"));
      groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
      groundTexture.repeat.set(25, 25);
      groundTexture.anisotropy = 16;
      groundTexture.encoding = THREE.sRGBEncoding;

      const groundMaterial = new THREE.MeshLambertMaterial({
        map: groundTexture,
      });

      let mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(20000, 20000),
        groundMaterial
      );
      mesh.position.y = -250;
      mesh.rotation.x = -Math.PI / 2;
      mesh.receiveShadow = true;
      scene2.add(mesh);

      scene2.add(new THREE.AmbientLight(0x666666));
      const light = new THREE.DirectionalLight(0xdfebff, 1);
      light.position.set(50, 200, 100);
      light.position.multiplyScalar(1.3);

      light.castShadow = true;

      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;

      const d = 300;

      light.shadow.camera.left = -d;
      light.shadow.camera.right = d;
      light.shadow.camera.top = d;
      light.shadow.camera.bottom = -d;

      light.shadow.camera.far = 1000;
      scene2.add(light);

      renderer2 = new THREE.WebGLRenderer({ antialias: true });
      renderer2.setPixelRatio(window.devicePixelRatio);
      document.getElementById("container").appendChild(renderer2.domElement);

      window.addEventListener("resize", this.onWindowResize);
    },
    render() {
      renderer2.render(scene2, camera);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer2.setSize(window.innerWidth, window.innerHeight);
      this.render();
    },
  },
  mounted() {
    this.init();
    this.animate();
  },
};
</script>
<style>
@import "../assets/css/main.css";
</style>
<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

canvas {
  position: fixed;
  width: 100%;
  height: 100%;
}

a {
  color: #8ff;
}

#menu {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
}

.element {
  width: 120px;
  height: 160px;
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
  border: 1px solid rgba(127, 255, 255, 0.25);
  font-family: Helvetica, sans-serif;
  text-align: center;
  line-height: normal;
  cursor: default;
}

.element:hover {
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
  border: 1px solid rgba(127, 255, 255, 0.75);
}

.element .number {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.75);
}

.element .symbol {
  position: absolute;
  top: 40px;
  left: 0px;
  right: 0px;
  font-size: 60px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
}

.element .details {
  position: absolute;
  bottom: 15px;
  left: 0px;
  right: 0px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.75);
}

button {
  color: rgba(127, 255, 255, 0.75);
  background: transparent;
  outline: 1px solid rgba(127, 255, 255, 0.75);
  border: 0px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: rgba(0, 255, 255, 0.5);
}

button:active {
  color: #000000;
  background-color: rgba(0, 255, 255, 0.75);
}
</style>
