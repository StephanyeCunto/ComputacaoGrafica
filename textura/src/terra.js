import * as THREE from 'three';

import { Lua } from './lua.js';
import { Atmosfera } from './atmosfera.js';

export class Terra{
    constructor( radius, texture, position, scene, material){
        this.radius = radius;
        this.position = position;
        this.distanceSol = position.x;
        this.geometry = new THREE.SphereGeometry(this.radius, 256, 256);
        this.texture = texture;
        this.speed = 0.01;
        this.speedOrbita =  0.001 / (this.distanceSol / 30);

        this.loadTextures();
        
        const grupo = new THREE.Group();
        this.grupo = grupo;

        grupo.add((this.atmosfera = new Atmosfera(this.radius)).Mesh);
        grupo.add((this.lua = new Lua()).Mesh);

        this.Mesh = new THREE.Mesh(this.geometry, this.createMaterial(material));
        this.Mesh.castShadow = true;
        this.Mesh.receiveShadow = true;

        this.grupo.position.set(this.position.x, this.position.y, this.position.z);
        grupo.add(this.Mesh);
        scene.add(grupo);
    }

    translate(){
        this.Mesh.rotation.y += this.speed;
    }

    rotate(){
        this.grupo.position.x = Math.sin(Date.now() * this.speedOrbita) * this.distanceSol;
        this.grupo.position.z = Math.cos(Date.now() * this.speedOrbita) * this.distanceSol;
        this.grupo.position.y = this.position.y;
    }

    tick(){
        //this.rotate();
        this.translate();
        this.atmosfera.tick();
        this.lua.tick();
    }

    createMaterial(type){
        const baseConfig = {
            map: this.texturaTerra,
            emissiveMap: this.emissiveMap,
            emissive: new THREE.Color(0xffcc88),
            emissiveIntensity: 0.1,
            roughness: 1.0,
            metalness: 0.0
        };

        switch(type) {
            case 'Bump Mapping':
                return new THREE.MeshStandardMaterial({
                    ...baseConfig,
                    bumpMap: this.bumpMap,
                    bumpScale: 10
                });
            case 'Displacement Mapping':
                return new THREE.MeshStandardMaterial({
                    ...baseConfig,
                    displacementMap: this.displacementMap,
                    displacementScale: 0.3,         
                    displacementBias: 0
                });
            case 'Normal Mapping':
                return new THREE.MeshStandardMaterial({
                    ...baseConfig,            
                    normalMap: this.normalMap
                });
            default:
                return new THREE.MeshStandardMaterial({ ...baseConfig});
        } 
    }

    loadTextures() {
        const loader = new THREE.TextureLoader();
        this.texturaTerra = loader.load('/src/assets/textures/8081_earthmap10k.jpg');
        this.emissiveMap = loader.load('/src/assets/textures/8081_earthlights10k.jpg');
        this.displacementMap = loader.load('/src/assets/textures/8081_earthdisplacement10k.jpg');
        this.normalMap = loader.load('/src/assets/textures/earth_normal_2048.jpg');
        this.bumpMap = loader.load('/src/assets/textures/elev_bump_16k.jpg');
    }
}
