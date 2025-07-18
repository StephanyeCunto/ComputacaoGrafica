import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 100);

const controls = new TrackballControls(camera, renderer.domElement);

const scene = new THREE.Scene();

let cuboLamber, cuboPhong;
let luzPontualVermelha, luzPontualVerde, luzPontualAzul;

function createIluminacaoBasic(){
    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.3);

    const luzDirecional = new THREE.DirectionalLight(0xfff000, 8);
    luzDirecional.position.set(80, 80, 80);
    
    scene.add(luzAmbiente, luzDirecional);
}

function createCubos(){
    const geometry = new THREE.SphereGeometry(12,64,64);

    const meshPhong = new THREE.MeshPhongMaterial({color: 0x888888});
    const meshLamber = new THREE.MeshLambertMaterial({color: 0x888888});

    cuboPhong = new THREE.Mesh(geometry, meshPhong);
    cuboLamber = new THREE.Mesh(geometry, meshLamber);

    cuboPhong.position.x = -20;
    cuboLamber.position.x = 20;
    scene.add(cuboLamber,cuboPhong);
}

function createIluminacaoPontual(){
    luzPontualVermelha = new THREE.PointLight(0xff0000, 3000, 300, 1);
    luzPontualVerde = new THREE.PointLight(0x00ff00, 3000 , 300, 1);
    luzPontualAzul = new THREE.PointLight(0x0000ff, 3000, 300, 1);
    scene.add(luzPontualAzul, luzPontualVerde, luzPontualVermelha);

    // luzPontualAzul.position.set(-80, 0, 80);
    // luzPontualVerde.position.set(0, 80, 80);
    // luzPontualVermelha.position.set(80, 0, 80);
}

function animatePontualVermelho(){
    luzPontualVermelha.position.x = Math.sin(Date.now() * 0.001) * 80;
    luzPontualVermelha.position.y = Math.cos(Date.now() * 0.001) * 80;

    setInterval(() => luzPontualVermelha.intensity = Math.random() > 0.5 ? 3000 : 0 , 500); 
}

function animatePontualVerde(){
    luzPontualVerde.position.x = Math.sin(Date.now() * 0.005) * 80;
    luzPontualVerde.position.y = Math.cos(Date.now() * 0.005) * 80;

    setInterval(() => luzPontualVerde.intensity = Math.random() > 0.5 ? 3000 : 0 , 500); 
}

function animatePontualAzul(){
    luzPontualAzul.position.x = Math.sin(Date.now() * 0.0002) * 80;
    luzPontualAzul.position.y = Math.cos(Date.now() * 0.0002) * 80;

    setInterval(() => luzPontualAzul.intensity = Math.random() > 0.5 ? 3000 : 0 , 500); 
}

createCubos();
createIluminacaoBasic();
createIluminacaoPontual();

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

    animatePontualAzul();
    animatePontualVerde();
    animatePontualVermelho();
}

animate();