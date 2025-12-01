import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

// The camera takes in perspective view, aspect ration, camera length
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// where to render the 3D stuffs
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// The basics or the template have been created
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// This type of material dows not require light
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff5347,
//   wireframe: true,
// });

// This reacts to light bouncing off of it.
const material = new THREE.MeshStandardMaterial({
  color: 0xff5347,
});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// The light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// map helpers
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);

const moonTexture = new THREE.TextureLoader().load("/images/moon.jpg");
const normalTexture = new THREE.TextureLoader().load("/images/normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    moonTexture,
    normalMap: normalTexture
  })
);

moon.position.z = 30
moon.position.setX(-10)

scene.add(moon);

function moveCamera() {
const t = document.body.getBoundingClientRect().top

camera.position.z = t * -0.01
camera.position.x = t * -0.0002
camera.position.y = t * -0.0002
}

document.body.onscroll = moveCamera


const spaceTexture = new THREE.TextureLoader().load("/images/space.jpg");
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
