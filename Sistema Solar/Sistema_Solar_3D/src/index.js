import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { Planeta } from './planeta.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.z = 250;
const controls = new TrackballControls(camera, renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000510);
const planetasScene = [];

adicionaLuz();
criarSistemaSolar();
animate();

function criarSistemaSolar(){
    criarSol();
    criarPlanetas();
}

function adicionaLuz() {
    const luzAmbiente = new THREE.AmbientLight(0x404040, 0.5); 
    const luzSolar = new THREE.PointLight(0xffffff, 2, 2000, 0.1);
    luzSolar.position.set(0, 0, 0);
    scene.add(luzAmbiente, luzSolar);
 }

function criarPlanetas() {
    const planetas = [
        { nome: 'mercurio', radius: 4, texture:'src/img/8k_mercury.jpg', position:{ x: 30, y: 0, z: 0 }},
        { nome: 'venus', radius: 6, texture:'src/img/8k_venus_surface.jpg', position:{ x: 50, y: 0, z: 0 }},
        { nome: 'terra', radius: 6, texture:'earth', position:{ x: 80, y: 0, z: 0 }, atmosfera:true, lua:true , earth:true},
        { nome: 'marte', radius: 4, texture:'src/img/8k_mars.jpg', position:{ x: 110, y: 0, z: 0 }},
        { nome: 'jupiter', radius: 10, texture:'src/img/8k_jupiter.jpg', position:{ x: 130, y: 0, z: 0 }},
        { nome: 'saturno', radius: 9, texture:'src/img/8k_saturn.jpg', position:{ x: 160, y: 0, z: 0 }},
        { nome: 'netuno', radius: 4, texture:'src/img/2k_neptune.jpg', position:{ x: 190, y: 0, z: 0 }},
        { nome: 'urano', radius: 4, texture:'src/img/2k_uranus.jpg', position:{ x: 210, y: 0, z: 0 }}
    ];

   for (const planeta of planetas) {
        const planetaScene = new Planeta(planeta.radius, planeta.texture, planeta.position, scene, planeta.atmosfera, planeta.lua,planeta.earth);
        planetasScene.push(planetaScene);
    }
}

function criarSol() {
    const raio = 20;
    const segmentos = 64;
    const solGeometry = new THREE.SphereGeometry(raio, segmentos, segmentos);
    const texturaSol = new THREE.TextureLoader().load('/src/img/8k_sun.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texturaSol});
    const sol = new THREE.Mesh(solGeometry, material);
    sol.position.set(0, 0, 0);
    sol.name = 'sol';

    sol.tick = () => {
        sol.rotation.y+= 0.001;
    };

    scene.add(sol);
}

function animate() {
    requestAnimationFrame(animate);
    scene.getObjectByName('sol').tick();

    planetasScene.forEach(planet => {
      planet.tick();
    });

    controls.update();
    renderer.render(scene, camera);
}