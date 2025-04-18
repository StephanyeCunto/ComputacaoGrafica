import * as THREE from 'three';

import { Lua } from './lua.js';

export class Planeta{
    constructor( radius, texture, position,scene, atmosphere, lua, earth){
        this.radius = radius;
        this.position = position;
        this.distanceSol = position.x;
        this.geometry = new THREE.SphereGeometry(this.radius, 64, 64);
        this.texture = texture;
        this.speed = 0.01;
        this.speedOrbita =  0.001 / (this.distanceSol / 30);

        const grupo = new THREE.Group();
        this.grupo = grupo;
        if(atmosphere) this.criarAtmosfera();
        if(lua) this.criarLua();
        this.material = earth ? this.materialTerra() : this.material = this.materialGenerico()

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.grupo.position.set(this.position.x, this.position.y, this.position.z);
        grupo.add(this.mesh);
        scene.add(grupo);
    }

    rotate(){
        this.mesh.rotation.y += this.speed;
    }

    translate(){
        this.grupo.position.x = Math.sin(Date.now() * this.speedOrbita) * this.distanceSol;
        this.grupo.position.z = Math.cos(Date.now() * this.speedOrbita) * this.distanceSol;
        this.grupo.position.y = this.position.y;
    }

    tick(){
        this.rotate();
        this.translate();
        if(this.atmosfera) this.atmosfera.tick();
        if(this.lua) this.lua.tick();
    }

    criarLua(){
        const lua = new Lua();
        this.grupo.add(lua.mesh);
        this.lua = lua;
    }

    criarAtmosfera(){
        const geometryAtmosfera = new THREE.SphereGeometry(this.radius + 0.02, 64, 64);
        const texturaAtmosfera = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png');
        const materialAtmosfera = new THREE.MeshStandardMaterial({ map:texturaAtmosfera, 
            roughness: 0.9,
            metalness: 0.1 
        });
        materialAtmosfera.opacity = 0.8;
        materialAtmosfera.transparent = true;

        const atmosfera = new THREE.Mesh(geometryAtmosfera, materialAtmosfera);

        atmosfera.tick = () => {
            atmosfera.rotation.y += 0.02;
        }

        this.atmosfera = atmosfera;
        this.grupo.add(atmosfera);
    }

    materialGenerico(){
        const material = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load(this.texture), 
            roughness: 0.9,
            metalness: 0.1 
        });

        return material;
    }

    materialTerra(){
        const texturaTerra = new THREE.TextureLoader().load('/src/img/8k_earth_daymap.jpg');
        const normalMap = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');
        const material = new THREE.MeshStandardMaterial({
            map: texturaTerra,
            normalMap: normalMap,
            normalScale: new THREE.Vector2(1, 1),
            roughness: 0.9,
            metalness: 0.1
        });
        return material;
    }
}