import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { planeta } from './planeta.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.z = 250;
const controls = new TrackballControls(camera, renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000510);
const planetas = [];

adicionaLuz();
//criarEstrelas();
criarSistemaSolar();
animate();

function criarEstrelas(){
    const geometryStar = new THREE.SphereGeometry(0.1, 8, 8);
    const materialStar = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const star = new THREE.Mesh(geometryStar, materialStar);
    scene.add(star);
}

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
    const mercurio = new planeta(4, 'src/img/8k_mercury.jpg', { x: 30, y: 0, z: 0 }, scene);
    planetas.push(mercurio);
    const venus = new planeta(6, 'src/img/8k_venus_surface.jpg', { x: 50, y: 0, z: 0 }, scene);
    planetas.push(venus);
    const terra = new planeta(6, 'earth', { x: 80, y: 0, z: 0 }, scene, true, true, true);
    planetas.push(terra);
    const marte = new planeta(4, 'src/img/8k_mars.jpg', { x: 110, y: 0, z: 0 }, scene);
    planetas.push(marte);
    const jupiter = new planeta(10, 'src/img/8k_jupiter.jpg', { x: 130, y: 0, z: 0 }, scene);
    planetas.push(jupiter);
    const saturno = new planeta(9, 'src/img/8k_saturn.jpg', { x: 160, y: 0, z: 0 }, scene);
    planetas.push(saturno);
    const netuno = new planeta(4, 'src/img/2k_neptune.jpg', { x: 190, y: 0, z: 0 }, scene);
    planetas.push(netuno);
    const urano = new planeta(4, 'src/img/2k_uranus.jpg', { x: 210, y: 0, z: 0 }, scene);
    planetas.push(urano);
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

   planetas.forEach(planet => {
      planet.tick();
    });

    controls.update();
    renderer.render(scene, camera);
}