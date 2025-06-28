 import *  as THREE from 'three';

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 200);
const controls = new TrackballControls(camera, renderer.domElement);

const scene = new THREE.Scene();
//scene.background= new THREE.Color(0xffffff);

let cubo, esfera;
let luzPontualVermelha, luzPontualVerde, luzPontualAzul;
let helperVermelho, helperVerde, helperAzul;

function createIluminacaoBasic(){
    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(luzAmbiente);

    const luzDirecional = new THREE.DirectionalLight(0xfff000, 8);
    luzDirecional.position.set(80, 80, 80);

    scene.add(luzDirecional);

    const helperDirecional = new THREE.DirectionalLightHelper(luzDirecional, 10, 0xff0000);
    scene.add(helperDirecional);
}

function createIluminacaoPontual(){
    luzPontualVermelha = new THREE.PointLight(0xff0000, 3000, 300, 1);
    luzPontualVermelha.position.set(80, 0, 80);

    luzPontualVerde = new THREE.PointLight(0x00ff00, 3000 , 300, 1);
    luzPontualVerde.position.set(0, 80, 80);

    luzPontualAzul = new THREE.PointLight(0x0000ff, 3000, 300, 1);
    luzPontualAzul.position.set(-80, 0, 80);

    scene.add(luzPontualVermelha, luzPontualAzul, luzPontualVerde);

    helperVerde = new THREE.PointLightHelper(luzPontualVerde, 10);
    helperAzul = new THREE.PointLightHelper(luzPontualAzul, 10);
    helperVermelho = new THREE.PointLightHelper(luzPontualVermelha, 10);

    scene.add(helperVerde, helperAzul, helperVermelho);
}

function createCubo(){
    const geometry = new THREE.BoxGeometry(20,20,20);
    const mesh = new THREE.MeshPhongMaterial({
        color: 0x888888,
        shininess: 100
     
    });
    cubo = new THREE.Mesh(geometry, mesh);
    scene.add(cubo);
}

function createEsfera(){
    const geometry = new THREE.SphereGeometry(12,64,64);
    const mesh = new THREE.MeshLambertMaterial({
        color: 0x888888
    });

    esfera = new THREE.Mesh(geometry, mesh);

    scene.add(esfera);
}

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    animateCubo();
    animateEsfera();
    animatePontualVermelho();
    animatePontualVerde();
    animatePontualAzul();
}

function animateCubo(){
    cubo.position.x = (Math.sin(Date.now() * 0.001) * 5) - 40;
    cubo.position.y = Math.cos(Date.now() * 0.001) * 5;
    cubo.rotation.x = Math.sin(Date.now() * 0.0002) * 5;
    cubo.rotation.y = Math.cos(Date.now() * 0.0002) * 5;
}

function animateEsfera(){
    esfera.position.x = -Math.sin(Date.now() * 0.001) * 5;
    esfera.position.y = -Math.cos(Date.now() * 0.001) * 5;
    esfera.rotation.x = Math.sin(Date.now() * 0.0002) * 5;
    esfera.rotation.y = Math.cos(Date.now() * 0.0002) * 5; 
}

function animatePontualVermelho(){
    luzPontualVermelha.position.x = Math.sin(Date.now() * 0.001) * 80;
    luzPontualVermelha.position.y = Math.cos(Date.now() * 0.001) * 80;

    setInterval(() => luzPontualVermelha.intensity = Math.random() > 0.5 ? 3000 : 0 , 5000); 
}

function animatePontualVerde(){
    luzPontualVerde.position.x = Math.sin(Date.now() * 0.005) * 80;
    luzPontualVerde.position.y = Math.cos(Date.now() * 0.005) * 80;

    setInterval(() => luzPontualVerde.intensity = Math.random() > 0.5 ? 3000 : 0 , 5000); 
}

function animatePontualAzul(){
    luzPontualAzul.position.x = Math.sin(Date.now() * 0.0002) * 80;
    luzPontualAzul.position.y = Math.cos(Date.now() * 0.0002) * 80;

    setInterval(() => luzPontualAzul.intensity = Math.random() > 0.5 ? 3000 : 0 , 5000); 
}

createIluminacaoBasic();
createIluminacaoPontual();
createCubo();
createEsfera();
animate();