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

let terra;

criarSistema();
adicionarLuz();
animate();


function criarSistema(){
  const grupoTerra = new THREE.Group();
  grupoTerra.add((terra =new Terra()).grupo);
  grupoTerra.rotation.x = Math.PI/7;

  scene.add(grupoTerra);
}

function adicionarLuz(){
  const luzAmbiente = new THREE.AmbientLight(0x404040, 0.5); 
  scene.add(luzAmbiente);
}

function animate() {
  requestAnimationFrame(animate);
  terra.tick();
  controls.update();
  renderer.render(scene, camera);
}
