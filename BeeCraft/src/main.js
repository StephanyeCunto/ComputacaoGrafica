import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { Bee } from './Bee';
import { World } from './World';
import { Sky } from './Sky';

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

let controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

let isOrthographic = false;

document.body.addEventListener('click', () => {
    if (!isOrthographic) {
        controls.lock();
    }
});

const clock = new THREE.Clock();
const velocity = new THREE.Vector3();

function initLights() {
    const ambientLight = new THREE.AmbientLight(0xfbf9f3, 3);
    scene.add(ambientLight);
}

const bee = new Bee((model) => {
    scene.add(model);
    controls.getObject().position.copy(model.position.clone().add(new THREE.Vector3(0, 10, 30)));
});
const world = new World((model) => scene.add(model));
const sky = new Sky((model) => scene.add(model));

function updatePosition() {
    if (bee && bee.beeModel) {
        if (isOrthographic) {
            controls.target.copy(bee.beeModel.position);
            camera.position.set(bee.beeModel.position.x, bee.beeModel.position.y + 10, bee.beeModel.position.z + 30);
            camera.lookAt(bee.beeModel.position);
        }
    }
}

window.addEventListener('keydown', (event) => {
    switch (event.key.toLowerCase()) {
        case 'o':
            const aspect = window.innerWidth / window.innerHeight;
            const frustumSize = 200;
            
            camera = new THREE.OrthographicCamera(
                (frustumSize * aspect) / -2, // left
                (frustumSize * aspect) / 2,  // right
                frustumSize / 2,             // top
                frustumSize / -2,            // bottom
                0.1,                         // near
                2000                         // far
            );
            
            isOrthographic = true;
            updatePosition();
            
        //    controls = new TrackballControls(camera, renderer.domElement);
        //    controls.enableDamping = true;
         //   controls.dampingFactor = 0.05;
            break;
            
        case 'p':
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
            
            isOrthographic = false;
            
            controls = new PointerLockControls(camera, document.body);
            scene.add(controls.getObject());
            
            if (bee && bee.beeModel) {
                controls.getObject().position.copy(bee.beeModel.position.clone().add(new THREE.Vector3(0, 10, 30)));
            }
            break;
    }
});

// Animação
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const moveSpeed = 20;
    
    // Movimento automático apenas no modo perspectiva
    if (!isOrthographic) {
        // Move constantemente para frente na direção da câmera
        velocity.set(0, 0, -1); // Direção "frente"
        velocity.applyQuaternion(camera.quaternion); // Aplica a rotação da câmera
        velocity.multiplyScalar(moveSpeed * delta); // Aplica velocidade
        controls.getObject().position.add(velocity); // Move a câmera
        
    } else {
        // Atualiza controles TrackballControls no modo ortográfico
        if (controls && controls.update) {
            controls.update();
        }
    }
    
    if (bee) bee.animate();
    renderer.render(scene, camera);
}

// Redimensionamento da janela
window.addEventListener('resize', () => {
    const aspect = window.innerWidth / window.innerHeight;
    
    if (isOrthographic) {
        const frustumSize = 200;
        camera.left = (frustumSize * aspect) / -2;
        camera.right = (frustumSize * aspect) / 2;
        camera.top = frustumSize / 2;
        camera.bottom = frustumSize / -2;
    } else {
        camera.aspect = aspect;
    }
    
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Inicializa
initLights();
animate();