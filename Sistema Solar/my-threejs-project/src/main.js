import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 240;

const controls = new TrackballControls(camera, renderer.domElement);

criarSistemaSolar();
adicionaLuz();

function adicionaLuz() {
    const luzAmbiente = new THREE.AmbientLight(0x404040, 1.5); 
    const luzDirecional = new THREE.DirectionalLight(0xffffff, 3);
    luzDirecional.position.set(0, 0, 0);
    luzDirecional.name = 'luzDirecional';
    scene.add(luzAmbiente,luzDirecional);

    luzDirecional.tick = () => {
        luzDirecional.position.x = -scene.terraGrupo.position.x;
        luzDirecional.position.z = -scene.terraGrupo.position.z;
        luzDirecional.position.y = scene.terraGrupo.position.y + 10;
    }
}

function criarSistemaSolar() {
    scene.add(criarSol());
    scene.add(criarMercurio());
    scene.add(criarTerra());
    scene.add(criarNetuno());
    scene.add(criarVenus());
    scene.add(criarMarte());
    scene.add(criarJupiter());
    scene.add(criarSaturno());
    scene.add(criarUrano());

    criarSistemaSolar.tick = () => {
        scene.getObjectByName('sol').tick();
        scene.getObjectByName('lua').tick();
        scene.getObjectByName('mercurio').tick();
        scene.getObjectByName('venus').tick();
        scene.getObjectByName('marte').tick();
        scene.getObjectByName('jupiter').tick();
        scene.getObjectByName('saturno').tick();
        scene.getObjectByName('urano').tick();

        scene.getObjectByName('netuno').tick();

        scene.getObjectByName('luzDirecional').tick();

    
        scene.terraGrupo.tick(); 

    }
}

function criarLua() {
    const raio = 2;
    const segmentos = 64;
    const luaGeometry = new THREE.SphereGeometry(raio, segmentos, segmentos);
    const texturaLua = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/moon_1024.jpg');
    const material = new THREE.MeshPhongMaterial({ map: texturaLua });
    const lua = new THREE.Mesh(luaGeometry, material);
    lua.name = 'lua';
    lua.layers.set(0);

    lua.tick = () => {
       lua.rotation.y += 0.01;
       lua.position.x = Math.cos(Date.now() * 0.001) * 10;
       lua.position.z = Math.sin(Date.now() * 0.001) * 10;
    }

    return lua;
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
    return sol;
}

function criarMercurio() {
    const raio = 4;
    const segmentos = 64;
    const mercurioGeometry = new THREE.SphereGeometry(raio, segmentos, segmentos);
    const texturaMercurio = new THREE.TextureLoader().load('src/img/8k_mercury.jpg');
    const material = new THREE.MeshPhongMaterial({
        map: texturaMercurio,
    });     
    const planetaMercurio = new THREE.Mesh(mercurioGeometry, material);
    planetaMercurio.position.set(scene.getObjectByName('sol').position.x+30, scene.getObjectByName('sol').position.y, scene.getObjectByName('sol').position.z);
    planetaMercurio.name = 'mercurio';

    planetaMercurio.tick = () => {
        planetaMercurio.rotation.y += 0.01;
        planetaMercurio.position.x = Math.cos(Date.now() * 0.0001) * 30;
        planetaMercurio.position.z = Math.sin(Date.now() * 0.0001) * 30;
    }
    return planetaMercurio;
}

function criarVenus() {
    const raio = 6;
    const segmentos = 64;
    const venusGeometry = new THREE.SphereGeometry(raio, segmentos, segmentos);
    const texturaVenus = new THREE.TextureLoader().load('src/img/8k_venus_surface.jpg');
    const material = new THREE.MeshPhongMaterial({
        map: texturaVenus,
    });

    const planetaVenus = new THREE.Mesh(venusGeometry, material);
    planetaVenus.position.set(scene.getObjectByName('sol').position.x+50, scene.getObjectByName('sol').position.y, scene.getObjectByName('sol').position.z);

    planetaVenus.name = 'venus';

    planetaVenus.tick = () => {
        planetaVenus.rotation.y += 0.01;
        planetaVenus.position.x = Math.cos(Date.now() * 0.0001) * 50;
        planetaVenus.position.z = Math.sin(Date.now() * 0.0001) * 50;
    }
    return planetaVenus;
}

function criarMarte() {
    const raio = 4;
    const segmentos = 64;
    const marteGeometry = new THREE.SphereGeometry(raio, segmentos, segmentos);
    const texturaMarte = new THREE.TextureLoader().load('src/img/8k_mars.jpg');
    const material = new THREE.MeshPhongMaterial({
        map: texturaMarte,
    }); 
    const planetaMarte = new THREE.Mesh(marteGeometry, material);
    planetaMarte.position.set(scene.getObjectByName('sol').position.x+110, scene.getObjectByName('sol').position.y, scene.getObjectByName('sol').position.z);
    planetaMarte.name = 'marte';
    planetaMarte.tick = () => {
        planetaMarte.rotation.y += 0.01;
        planetaMarte.position.x = Math.cos(Date.now() * 0.0001) * 110;
        planetaMarte.position.z = Math.sin(Date.now() * 0.0001) * 110;
    }   
    return planetaMarte;
}

function criarJupiter() {  
    const raio = 10;
    const segmentos = 64;
    const jupiterGeometry = new THREE.SphereGeometry(raio, segmentos, segmentos);
    const texturaJupiter = new THREE.TextureLoader().load('src/img/8k_jupiter.jpg');
    const material = new THREE.MeshPhongMaterial({
        map: texturaJupiter,
    });
    const planetaJupiter = new THREE.Mesh(jupiterGeometry, material);
    planetaJupiter.position.set(scene.getObjectByName('sol').position.x+140, scene.getObjectByName('sol').position.y, scene.getObjectByName('sol').position.z);
    planetaJupiter.name = 'jupiter';
    planetaJupiter.tick = () => {
        planetaJupiter.rotation.y += 0.01;
        planetaJupiter.position.x = Math.cos(Date.now() * 0.0001) * 140;
        planetaJupiter.position.z = Math.sin(Date.now() * 0.0001) * 140;
    }
    return planetaJupiter;
}

function criarSaturno(){
    const raio = 9;
    const segmentos = 64;
    const saturnoGeometry = new THREE.SphereGeometry(raio, segmentos, segmentos);
    const texturaSaturno = new THREE.TextureLoader().load('src/img/8k_saturn.jpg');
    const material = new THREE.MeshPhongMaterial({
        map: texturaSaturno,
    });
    const planetaSaturno = new THREE.Mesh(saturnoGeometry, material);
    planetaSaturno.position.set(scene.getObjectByName('sol').position.x+170, scene.getObjectByName('sol').position.y, scene.getObjectByName('sol').position.z);
    planetaSaturno.name = 'saturno';
    planetaSaturno.tick = () => {
        planetaSaturno.rotation.y += 0.01;
        planetaSaturno.position.x = Math.cos(Date.now() * 0.0001) * 170;
        planetaSaturno.position.z = Math.sin(Date.now() * 0.0001) * 170;
    }
    return planetaSaturno;
}

function criarNetuno() {
    const raio = 4;
    const segmentos = 64;
    const neptuneGeometry = new THREE.SphereGeometry(raio, segmentos, segmentos);
    const texturaNeptune = new THREE.TextureLoader().load('src/img/2k_neptune.jpg');

   const material = new THREE.MeshPhongMaterial({
        map: texturaNeptune,
    });

    const planetaNeptune = new THREE.Mesh(neptuneGeometry, material);
    planetaNeptune.position.set(scene.getObjectByName('sol').position.x+190, scene.getObjectByName('sol').position.y, scene.getObjectByName('sol').position.z);

    planetaNeptune.name = 'netuno';

    planetaNeptune.tick = () => {
        planetaNeptune.rotation.y += 0.01;
        planetaNeptune.position.x = Math.cos(Date.now() * 0.0001) * 190;
        planetaNeptune.position.z = Math.sin(Date.now() * 0.0001) * 190;
    }
    return planetaNeptune;
}

function criarUrano() {
    const raio = 4;
    const segmentos = 64;
    const uranoGeometry = new THREE.SphereGeometry(raio, segmentos, segmentos);
    const texturaUrano = new THREE.TextureLoader().load('src/img/2k_uranus.jpg');
    const material = new THREE.MeshPhongMaterial({
        map: texturaUrano,
    });
    const planetaUrano = new THREE.Mesh(uranoGeometry, material);
    planetaUrano.position.set(scene.getObjectByName('sol').position.x+210, scene.getObjectByName('sol').position.y, scene.getObjectByName('sol').position.z);
    planetaUrano.name = 'urano';
    planetaUrano.tick = () => {
        planetaUrano.rotation.y += 0.01;
        planetaUrano.position.x = Math.cos(Date.now() * 0.0001) * 210;
        planetaUrano.position.z = Math.sin(Date.now() * 0.0001) * 210;
    }
    return planetaUrano;
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
    const lua = criarLua();

    grupo.position.set(scene.getObjectByName('sol').position.x+80, scene.getObjectByName('sol').position.y, scene.getObjectByName('sol').position.z);
    lua.position.set(planetaTerra.position.x+15, planetaTerra.position.y, planetaTerra.position.z);

    grupo.add(lua);
    scene.terraGrupo = grupo;

    grupo.tick = () => {
        grupo.rotation.y += 0.01;
        camadaNuvens.rotation.y += 0.008;
        planetaTerra.rotation.y += 0.001;
        grupo.position.x = Math.cos(Date.now() * 0.0001) * 80;
        grupo.position.z = Math.sin(Date.now() * 0.0001) * 80; 
    };

    return grupo;
}

function animate() {
    requestAnimationFrame(animate);

   criarSistemaSolar.tick();

    controls.update();
    renderer.render(scene, camera);
}

animate();