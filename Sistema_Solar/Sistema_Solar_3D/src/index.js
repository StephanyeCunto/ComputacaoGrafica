import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { Planeta } from './planeta.js';
import { Sol } from './sol.js';
import { Estrela } from './estrela.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.z = 250;
const controls = new TrackballControls(camera, renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000510);
const planetasScene = [];
const sol = new Sol();

adicionarLuz();
criarSistemaSolar();
animate();

function criarSistemaSolar(){
    scene.add(sol.Mesh);
    new Estrela(scene);
    criarPlanetas();
}

function adicionarLuz() {
    const luzAmbiente = new THREE.AmbientLight(0x404040, 0.5); 
    const luzSolar = new THREE.PointLight(0xf9e8c3, 4, 2000, 0.1);
    luzSolar.castShadow = true;

    luzSolar.position.set(0, 0, 0);
    scene.add(luzAmbiente, luzSolar);
 }

function criarPlanetas() {
    const planetas = [
        { nome: 'mercurio', radius: 4, texture:'src/assets/textures/8k_mercury.jpg', position:{ x: 30, y: 0, z: 0 }},
        { nome: 'venus', radius: 6, texture:'src/assets/textures/8k_venus_surface.jpg', position:{ x: 50, y: 0, z: 0 }},
        { nome: 'terra', radius: 6, texture:'earth', 
            position:{ x: 80, y: 0, z: 0 }, atmosfera:true, lua:true , earth:true},
        { nome: 'marte', radius: 4, texture:'src/assets/textures/8k_mars.jpg', position:{ x: 110, y: 0, z: 0 }},
        { nome: 'jupiter', radius: 10, texture:'src/assets/textures/8k_jupiter.jpg', position:{ x: 130, y: 0, z: 0 }},
        { nome: 'saturno', radius: 9, texture:'src/assets/textures/8k_saturn.jpg', position:{ x: 160, y: 0, z: 0 }, anel: true},
        { nome: 'urano', radius: 4, texture:'src/assets/textures/2k_uranus.jpg', position:{ x: 190, y: 0, z: 0 }, anel: true},
        { nome: 'netuno', radius: 4, texture:'src/assets/textures/2k_neptune.jpg', position:{ x: 210, y: 0, z: 0 }}
    ];

   for (const planeta of planetas) {
        const planetaScene = new Planeta(planeta.radius, planeta.texture, planeta.position, 
            scene, planeta.atmosfera, planeta.lua,planeta.earth, planeta.anel);
        planetasScene.push(planetaScene);
    }
}

function animate() {
    requestAnimationFrame(animate);

    sol.tick();
    planetasScene.forEach(planet => {
        planet.tick();
    });

    controls.update();
    renderer.render(scene, camera);
}