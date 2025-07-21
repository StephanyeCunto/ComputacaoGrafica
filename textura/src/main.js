import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { Terra } from './terra.js';
import { Sol } from './sol.js';
import { Estrela } from './estrela.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,10000);
camera.position.z = 15;
const controls = new TrackballControls(camera, renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000510);
const sol = new Sol();
let terra;

adicionarLuz();
criarSistemaSolar();
animate();

function criarSistemaSolar(){
    scene.add(sol.Mesh);
    new Estrela(scene);
    criarTerra();
}

function adicionarLuz() {
    const luzAmbiente = new THREE.AmbientLight(0x404040, 0.1); 
    const luzSolar = new THREE.PointLight(0xf9e8c3, 4, 2000, 0.1);
    luzSolar.castShadow = true;

    luzSolar.position.set(-50, 0, 0);
    scene.add(luzAmbiente, luzSolar);
}

const select = document.createElement('select');
select.style.position = 'absolute';
select.style.top = '10px';
select.style.left = '10px';
select.style.zIndex = '1';

const options = ['Nenhuma', 'Bump Mapping', 'Normal Mapping', 'Displacement Mapping'];
options.forEach((text, index) => {
    const opt = document.createElement('option');
    opt.value = text;
    opt.innerText = text;
    select.appendChild(opt);
});
document.body.appendChild(select);

select.addEventListener('change', () => {
    if (terra) {
        scene.remove(terra.grupo);
    }
    criarTerra(select.value);
});


function criarTerra(type) {
    terra = new Terra(6,"/src/assets/textures/8k_earth_daymap.jpg",{ x: 0, y: 0, z: 0 },scene,type);
}

function animate() {
    requestAnimationFrame(animate);

    sol.tick();
    terra.tick();

    controls.update();
    renderer.render(scene, camera);
}