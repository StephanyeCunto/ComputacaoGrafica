import *  as THREE from 'three';

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);
const controls = new TrackballControls(camera, renderer.domElement);

const scene = new THREE.Scene();
//scene.background= new THREE.Color(0xffffff);

function createIluminacaoBasic(){
    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(luzAmbiente);

    const luzDirecional = new THREE.DirectionalLight(0xfff000, 2);
    luzDirecional.position.set(100, 100, 100);
    luzDirecional.castShadow = true;

    scene.add(luzDirecional);
}

function createIluminacaoPontual(){
    const luzPontualVermelha = new THREE.PointLight(0xff0000, 3000, 300);
    luzPontualVermelha.position.set(25, 0, 25);

    const luzPontualVerde = new THREE.PointLight(0x00ff00, 3000 , 300);
    luzPontualVerde.position.set(0, 25, 25);

    const luzPontualAzul = new THREE.PointLight(0x0000ff, 3000, 300);
    luzPontualAzul.position.set(-25, 0, 25);

    scene.add(luzPontualVermelha, luzPontualAzul, luzPontualVerde);
}

function createCubo(){
    const geometry = new THREE.BoxGeometry(20,20,20);
    const mesh = new THREE.MeshPhongMaterial({
        color: 0x888888,
        shininess: 100
     
    });
    const cubo = new THREE.Mesh(geometry, mesh);
    cubo.castShadow = true;
    cubo.receiveShadow = true;

    scene.add(cubo);
}

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

createIluminacaoBasic();
createIluminacaoPontual();
createCubo();
animate();
