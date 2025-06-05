import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

import { Bee } from './Bee';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.z = 30;

const controls = new TrackballControls(camera, renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); 

const bee = new Bee(8);
scene.add(bee.group);

function initLights(){
  const light = new THREE.AmbientLight(0xf6e568, 10);
  scene.add(light);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);  
}

animate();
initLights();
