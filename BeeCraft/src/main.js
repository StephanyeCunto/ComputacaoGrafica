import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const controls = new TrackballControls(camera, renderer.domElement);

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const beeTexture = textureLoader.load('models/minecraft-bee/textures/beeTexture.png'); 

function initLights(){
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);
}

function newBee() {
  const loader = new GLTFLoader();
  loader.load('models/minecraft-bee/source/model.gltf', (gltf) => {
    const bee = gltf.scene;
    bee.scale.set(1.5, 1.5, 1.5);

    bee.traverse((child) => {
      if (child.isMesh) {
        child.material.map = beeTexture;  
        child.material.needsUpdate = true;
      }
    });

    scene.add(bee);
  }, undefined, (error) => {
    console.error('Erro ao carregar o modelo:', error);
  });
}

newBee();

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);  
}

animate();
initLights();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.handleResize();
});
