import * as THREE from 'three';

import { Lua } from './lua.js';

export class planeta{
    constructor(radius, texture, position,scene){
        this.radius = radius;
        this.position = position;
        this.distanceSol = position.x;
        this.geometry = new THREE.SphereGeometry(this.radius, 64, 64);
        this.texture = texture;
        this.speed = 0.01;
        this.speedOrbita =  0.001 / (this.distanceSol / 30);

        const grupo = new THREE.Group();
        this.grupo = grupo;
        if(texture == "earth"){
            this.material = this.materialTerra(); 
            this.lua = new Lua();
            grupo.add(this.lua.mesh);
        }else{
            this.material = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load(this.texture), 
                roughness: 0.9,
                metalness: 0.1 
            });
        }

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.grupo.position.set(this.position.x, this.position.y, this.position.z);
        grupo.add(this.mesh);
        scene.add(grupo);
    }

    addToScene(scene){
        scene.add(this.mesh);
    }

    setOpacity(opacity){
        this.material.transparent = true;
        this.material.opacity = opacity;
    }

    setSpeed(speed){
        this.speed = speed;
    }

    rotate(){
        this.mesh.rotation.y += this.speed;
    }

    tick(){
        this.rotate();
        this.grupo.position.x =  Math.sin(Date.now() * this.speedOrbita)* this.distanceSol;
        this.grupo.position.z =  Math.cos(Date.now() * this.speedOrbita)* this.distanceSol;
        this.grupo.position.y = this.position.y;  
        if(this.lua){
           this.lua.tick(this.position);
        } 
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