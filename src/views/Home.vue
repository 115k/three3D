<template>
  <div class="home">
    <div id="container"></div>
    <div id="menu">
      <button id="table">TABLE</button>
      <button id="sphere">SPHERE</button>
      <button id="helix">HELIX</button>
      <button id="grid">GRID</button>
      <button id="spin" @click="stop = false">SPIN</button>
      <button id="STOP" @click="stop = true">STOP</button>
    </div>
  </div>
</template>

<script>
// 新增1111
import * as THREE from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

let camera, scene, scene2, renderer, renderer2, controls;
const objects = [];
let root;
const targets = { table: [], sphere: [], helix: [], grid: [] };
/* eslint-disable */
const table = [
  "A", "Ruthenium", "101.07", 3, 1,
  "A", "Rhodium", "102.9055", 9, 1,
  "A", "Palladium", "106.42", 2, 2,
  "A", "Silver", "107.8682", 3, 2,
  "A", "Cadmium", "112.411", 4, 2,
  "A", "Tellurium", "127.6", 8, 2,
  "A", "Iodine", "126.90447", 9, 2,
  "A", "Xenon", "131.293", 10, 2,
  "A", "Caesium", "132.9054", 1, 3,
  "A", "Barium", "132.9054", 2, 3,
  "A", "Barium", "132.9054", 3, 3,
  "A", "Lanthanum", "138.90547", 4, 3,
  "A", "Cerium", "140.116", 5, 3,
  "A", "Praseodymium", "140.90765", 7, 3,
  "A", "Neodymium", "144.242", 8, 3,
  "A", "Promethium", "(145)", 9, 3,
  "A", "Samarium", "150.36", 10, 3,
  "A", "Europium", "151.964", 11, 3,
  "A", "Gadolinium", "157.25", 1, 4,
  "A", "Terbium", "158.92535", 2, 4,
  "A", "Dysprosium", "162.5", 3, 4,
  "A", "Holmium", "164.93032", 4, 4,
  "A", "Erbium", "167.259", 5, 4,
  "A", "Thulium", "168.93421", 6, 4,
  "A", "Ytterbium", "173.054", 7, 4,
  "A", "Lutetium", "174.9668", 8, 4,
  "A", "Hafnium", "178.49", 9, 4,
  "A", "Tantalum", "180.94788", 10, 4,
  "A", "Tungsten", "183.84", 11, 4,
  "A", "Rhenium", "186.207", 1, 5,
  "A", "Osmium", "190.23", 2, 5,
  "A", "Iridium", "192.217", 3, 5,
  "A", "Platinum", "195.084", 4, 5,
  "A", "Gold", "196.966569", 5, 5,
  "A", "Mercury", "200.59", 6, 5,
  "A", "Thallium", "204.3833", 7, 5,
  "A", "Lead", "207.2", 8, 5,
  "A", "Bismuth", "208.9804", 9, 5,
  "A", "Polonium", "(209)", 10, 5,
  "A", "Astatine", "(210)", 11, 5,
  "A", "Radon", "(222)", 2, 6,
  "A", "Francium", "(223)", 3, 6,
  "A", "Radium", "(226)", 4, 6,
  "A", "Actinium", "(227)", 5, 6,
  "A", "Thorium", "232.03806", 6, 6,
  "A", "Protactinium", "231.0588", 7, 6,
  "A", "Uranium", "238.02891", 8, 6,
  "A", "Neptunium", "(237)", 9, 6,
  "A", "Plutonium", "(244)", 10, 6,
  "A", "Americium", "(243)", 3, 7,
  "A", "Curium", "(247)", 4, 7,
  "A", "Berkelium", "(247)", 5, 7,
  "A", "Californium", "(251)", 6, 7,
  "A", "Einstenium", "(252)", 7, 7,
  "A", "Fermium", "(257)", 8, 7,
  "A", "Mendelevium", "(258)", 9, 7,
  "A", "Nobelium", "(259)", 4, 8,
  "A", "Lawrencium", "(262)", 5, 8,
  "A", "Rutherfordium", "(267)", 6, 8,
  "A", "Dubnium", "(268)", 7, 8,
  "A", "Seaborgium", "(271)", 8, 8,
  "A", "Bohrium", "(272)", 5, 9,
  "A", "Hassium", "(270)", 6, 9,
  "A", "Meitnerium", "(276)", 7, 9,
  "A", "Darmstadium", "(281)", 6, 10,
]
/* eslint-disable */
export default {
  name: "Home",
  components: {},
  data() {
    return {
      stop: false,
    };
  },
  methods: {
    init() {
      camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.z = 3000;

      // const r = "@/assets/Park3Med/";
      const urls = [
        require("@/assets/Park3Med/px.jpg"),
        require("@/assets/Park3Med/nx.jpg"),
        require("@/assets/Park3Med/py.jpg"),
        require("@/assets/Park3Med/ny.jpg"),
        require("@/assets/Park3Med/pz.jpg"),
        require("@/assets/Park3Med/nz.jpg"),
      ];

      const textureCube = new THREE.CubeTextureLoader().load(urls);
      textureCube.mapping = THREE.CubeRefractionMapping;

      scene = new THREE.Scene();
      scene2 = new THREE.Scene();

      scene2.background = textureCube;
      root = new THREE.Object3D();
      scene.add(root);

      // table

      for (let i = 0; i < table.length; i += 5) {
        const element = document.createElement("div");
        element.className = "element";
        element.style.backgroundColor =
          "rgba(0,127,127," + (Math.random() * 0.5 + 0.25) + ")";

        const number = document.createElement("div");
        number.className = "number";
        number.textContent = i / 5 + 1;
        element.appendChild(number);

        const symbol = document.createElement("div");
        symbol.className = "symbol";
        symbol.textContent = table[i];
        element.appendChild(symbol);

        const details = document.createElement("div");
        details.className = "details";
        details.innerHTML = table[i + 1] + "<br>" + table[i + 2];
        element.appendChild(details);

        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;
        // scene.add(objectCSS);
        root.add(objectCSS);

        objects.push(objectCSS);

        //
        const object = new THREE.Object3D();
        object.position.x = table[i + 3] * 140 - 1330;
        object.position.y = -(table[i + 4] * 180) + 990;

        targets.table.push(object);
      }
      // sphere
      const vector = new THREE.Vector3();
      for (let i = 0, l = objects.length; i < l; i++) {
        const phi = Math.acos(-1 + (2 * i) / l);
        const theta = Math.sqrt(l * Math.PI) * phi;

        const object = new THREE.Object3D();

        object.position.setFromSphericalCoords(800, phi, theta);

        vector.copy(object.position).multiplyScalar(2);

        object.lookAt(vector);

        targets.sphere.push(object);
      }

      // helix

      for (let i = 0, l = objects.length; i < l; i++) {
        const theta = i * 0.175 + Math.PI;
        const y = -(i * 8) + 450;
        const object = new THREE.Object3D();
        object.position.setFromCylindricalCoords(900, theta, y);
        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;
        object.lookAt(vector);
        targets.helix.push(object);
      }

      // grid

      for (let i = 0; i < objects.length; i++) {
        const object = new THREE.Object3D();
        object.position.x = (i % 5) * 400 - 800;
        object.position.y = -(Math.floor(i / 5) % 5) * 400 + 800;
        object.position.z = Math.floor(i / 25) * 1000 - 2000;
        targets.grid.push(object);
      }

      renderer2 = new THREE.WebGLRenderer();
      renderer2.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("container").appendChild(renderer2.domElement);

      //
      renderer = new CSS3DRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = 0;
      renderer.domElement.style.zIndex = 2;
      document.getElementById("container").appendChild(renderer.domElement);

      controls = new TrackballControls(camera, renderer.domElement);
      controls.minDistance = 500;
      controls.maxDistance = 6000;
      controls.rotateSpeed = 0.5;
      controls.addEventListener("change", this.render);

      const buttonTable = document.getElementById("table");
      buttonTable.addEventListener("click", () => {
        this.transform(targets.table, 2000);
      });
      const buttonSphere = document.getElementById("sphere");
      buttonSphere.addEventListener("click", () => {
        this.transform(targets.sphere, 2000);
      });
      const buttonHelix = document.getElementById("helix");
      buttonHelix.addEventListener("click", () => {
        this.transform(targets.helix, 2000);
      });
      const buttonGrid = document.getElementById("grid");
      buttonGrid.addEventListener("click", () => {
        this.transform(targets.grid, 2000);
      });
      this.transform(targets.helix, 2000);
      window.addEventListener("resize", this.onWindowResize);
    },
    render() {
      renderer.render(scene, camera);
      renderer2.render(scene2, camera);
    },
    animate() {
      requestAnimationFrame(this.animate);
      TWEEN.update();
      controls.update();
      if (!this.stop) {
        const time = Date.now() * 0.0004;
        root.rotation.y = time * 0.7; // 只围绕Y轴旋转
        this.render();
      }
    },
    onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer2.setSize(window.innerWidth, window.innerHeight);
      this.render();
    },
    transform(targets, duration) {
      TWEEN.removeAll();

      for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        const target = targets[i];
        new TWEEN.Tween(object.position)
          .to(
            {
              x: target.position.x,
              y: target.position.y,
              z: target.position.z,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();

        new TWEEN.Tween(object.rotation)
          .to(
            {
              x: target.rotation.x,
              y: target.rotation.y,
              z: target.rotation.z,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
      }

      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start();
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
  z-index: 3;
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
