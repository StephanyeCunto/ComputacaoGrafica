import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 60;

const controls = new TrackballControls(camera, renderer.domElement);

criarSistemaSolar();

adicionaLuz();

function adicionaLuz() {
    const luzDirecional = new THREE.DirectionalLight(0xffffff, 10);
    luzDirecional.name = 'luzDirecional';
    scene.add(luzDirecional);

    const luzAmbiente = new THREE.AmbientLight(0x404040, 1.5); 
    scene.add(luzAmbiente);
}

function criarSistemaSolar() {
    scene.add(criarSol());
    scene.add(criarTerra());

    criarSistemaSolar.tick = () => {
        scene.getObjectByName('luzDirecional').position.set(-scene.terraGrupo.position.x, 0, 0);
        scene.terraGrupo.tick();
        scene.getObjectByName('sol').tick();
        scene.terraGrupo.position.x = Math.cos(Date.now() * 0.0001) * 80;
        scene.terraGrupo.position.z = Math.sin(Date.now() * 0.0001) * 80;  
    }
}

function criarSol() {
    const raio = 15;
    const segmentos = 64;
    const solGeometry = new THREE.SphereGeometry(raio, segmentos, segmentos);
    const texturaSol = new THREE.TextureLoader().load('/src/img/8k_sun.jpg');
    const material = new THREE.MeshBasicMaterial({map: texturaSol});
    const sol = new THREE.Mesh(solGeometry, material);
    sol.position.set(0, 0, 0);
    sol.name = 'sol';

    sol.tick = () => {
        sol.rotation.y+= 0.0008;
    };
    return sol;
}


function criarTerra() {
    const raio = 6;
    const segmentos = 64;
    const terraGeometry = new THREE.SphereGeometry(raio, segmentos, segmentos);

    const texturaTerra = new THREE.TextureLoader().load('/src/img/8k_earth_daymap.jpg');
    const normalMap = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');
    const specularMap = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg');

    const material = new THREE.MeshPhongMaterial({
        map: texturaTerra,
        normalMap: normalMap,
        normalScale: new THREE.Vector2(1, 1),
        specularMap: specularMap,
        specular: new THREE.Color(0x333333), 
        shininess: 10
    });

    const planetaTerra = new THREE.Mesh(terraGeometry, material);

    const nuvemGeometry = new THREE.SphereGeometry(raio + 0.02, segmentos, segmentos);
    const nuvemTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png');

    const materialNuvem = new THREE.MeshPhongMaterial({
        map: nuvemTexture,
        transparent: true,
        opacity: 0.8,
    });

    const camadaNuvens = new THREE.Mesh(nuvemGeometry, materialNuvem);

    const grupo = new THREE.Group();
    grupo.add(planetaTerra);
    grupo.add(camadaNuvens);

    grupo.tick = () => {
        grupo.rotation.y += 0.01;
        camadaNuvens.rotation.y += 0.008;
    };

    grupo.position.set(scene.getObjectByName('sol').position.x+50, scene.getObjectByName('sol').position.y, scene.getObjectByName('sol').position.z);
    scene.terraGrupo = grupo;

    return grupo;
}

function animate() {
    requestAnimationFrame(animate);
    
    criarSistemaSolar.tick();

    controls.update();
    renderer.render(scene, camera);
}


animate();