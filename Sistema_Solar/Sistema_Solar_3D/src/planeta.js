import * as THREE from 'three';

import { Lua } from './lua.js';
import { Anel } from './anel.js';
import { Atmosfera } from './atmosfera.js';

export class Planeta{
    constructor( radius, texture, position,scene, atmosfera, lua, earth, anel){
        this.radius = radius;
        this.position = position;
        this.distanceSol = position.x;
        this.geometry = new THREE.SphereGeometry(this.radius, 64, 64);
        this.texture = texture;
        this.speed = 0.01;
        this.speedOrbita =  0.001 / (this.distanceSol / 30);

        const grupo = new THREE.Group();
        this.grupo = grupo;

        if(atmosfera) grupo.add((this.atmosfera = new Atmosfera(this.radius)).mesh);
        if(lua) grupo.add((this.lua = new Lua()).mesh);
        if(anel)  grupo.add((this.anel = new Anel(this.radius)).mesh);

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
        if(this.anel) this.anel.tick();
    }

    materialGenerico(){
        const material = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load(this.texture), 
            roughness: 0.9,
            metalness: 0.1 
        });

        return material;
    }

    materialTerra(){
        const texturaTerra = new THREE.TextureLoader().load('/src/assets/textures/8k_earth_daymap.jpg');
        const normalMap = new THREE.TextureLoader().load('/src/assets/textures/earth_normal_2048.jpg');
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