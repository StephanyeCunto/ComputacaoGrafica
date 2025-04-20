import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

import {Terra} from './terra.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 35;
const controls = new TrackballControls(camera, renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000510);

animate();
new Terra(scene);
adicionarLuz();

function adicionarLuz(){
  //const luzAmbiente = new THREE.AmbientLight(0x404040, 0.5); 
  const luzAmbiente = new THREE.AmbientLight(0xffffff, 4);
  scene.add(luzAmbiente);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}
