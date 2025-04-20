import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

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
criarTerra();
adicionarLuz();

function adicionarLuz(){
  //const luzAmbiente = new THREE.AmbientLight(0x404040, 0.5); 
  const luzAmbiente = new THREE.AmbientLight(0xffffff, 4);
  scene.add(luzAmbiente);
}

function criarTerra(){
  const geometry = new THREE.CircleGeometry(20, 128,128);
  const texturaTerra = new THREE.TextureLoader().load('/src/assets/textures/8k_earth_daymap.jpg');
         const material = new THREE.MeshStandardMaterial({
            map: texturaTerra,
            roughness: 0.9,
            metalness: 0.1
         });

  const terra = new THREE.Mesh(geometry, material);
  terra.position.set(0, 0, 0);
  terra.rotation.x = -Math.PI/2;

  const domo = criarDomo();
  const grupo = new THREE.Group();
  grupo.add(terra,domo);
  grupo.rotation.x = Math.PI/7;
  scene.add(grupo);
}

function criarDomo(){
  const geometry = new THREE.SphereGeometry(20, 128, 128, 0,  Math.PI * 2, 0, Math.PI / 2);

  const material = new THREE.MeshStandardMaterial({color: 0x888888, 
    transparent: true, 
    opacity: 0.5,
    roughness: 0.1,
    metalness: 0.8
  });

  const domo = new THREE.Mesh(geometry, material);
  domo.position.set(0, 0, 0);
  return domo;
}


function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}
