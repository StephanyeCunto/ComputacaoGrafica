import * as THREE from 'three';

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { FlyControls } from './FlyControls.js';

import { Bee } from './Bee';
import { Sky } from './Sky';
import { World } from './World';

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(180, 200, 180);

const scene = new THREE.Scene();

let controls = new TrackballControls(camera, renderer.domElement);
let flyControls = null;

let followBeeMode = true;
let isOrthographic = false;

const bee = new Bee((model) => scene.add(model));
const sky = new Sky((model) => scene.add(model));
const world = new World((model) => scene.add(model));

function initLights() {
    const ambientLight = new THREE.AmbientLight(0xdad8d6, 3);
    scene.add(ambientLight);
}

function createPerspectiveCamera() {
    return new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
}

function createOrthographicCamera() {
    const frustumSize = 300;
    const aspect = window.innerWidth / window.innerHeight;
    return new THREE.OrthographicCamera(
        frustumSize * aspect / -2,
        frustumSize * aspect / 2,
        frustumSize / 2,
        frustumSize / -2,
        0.1,
        2000
    );
}

function switchToOrthographic() {
    if (isOrthographic) return;
    
    const currentPosition = camera.position.clone();
    const currentRotation = camera.rotation.clone();
    
    if (controls && controls.dispose) controls.dispose();
    if (flyControls) {
        flyControls.disconnect();
        flyControls = null;
    }
    
    camera = createOrthographicCamera();
    camera.position.copy(currentPosition);
    camera.rotation.copy(currentRotation);
    
    if (followBeeMode) controls = new TrackballControls(camera, renderer.domElement);
    else flyControls = new FlyControls(camera, renderer.domElement);

    isOrthographic = true;
}

function switchToPerspective() {
    if (!isOrthographic) return;
    
    const currentPosition = camera.position.clone();
    const currentRotation = camera.rotation.clone();

    if (controls && controls.dispose) controls.dispose();
    if (flyControls) {
        flyControls.disconnect();
        flyControls = null;
    }

    camera = createPerspectiveCamera();
    camera.position.copy(currentPosition);
    camera.rotation.copy(currentRotation);
    
    if (followBeeMode) controls = new TrackballControls(camera, renderer.domElement);
   else flyControls = new FlyControls(camera, renderer.domElement);
    
    isOrthographic = false;
}

function animate() {
    requestAnimationFrame(animate);
    
    bee.animate();

    if (followBeeMode) controls.update();
        
    if (flyControls) {
        flyControls.update();
        const cameraOffset = new THREE.Vector3(10, -5, -50);
        cameraOffset.applyQuaternion(camera.quaternion);
        const targetBeePosition = camera.position.clone().add(cameraOffset);
        bee.beeModel.position.lerp(targetBeePosition, 0.08);
            
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);
        bee.beeModel.quaternion.slerp(camera.quaternion, 0.1);
    }
    
    renderer.render(scene, camera);
}

window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    
    if (key === 'f') {
        followBeeMode = !followBeeMode;
        
        if (followBeeMode) {
            if (flyControls) {
                flyControls.disconnect();
                flyControls = null;
            }
            controls = new TrackballControls(camera, renderer.domElement);
        } else {
            if (controls && controls.dispose) controls.dispose();
            flyControls = new FlyControls(camera, renderer.domElement);
        }
    }
    
    if (key === 'p') switchToPerspective();
    
    if (key === 'o') switchToOrthographic();
});

initLights();
animate();