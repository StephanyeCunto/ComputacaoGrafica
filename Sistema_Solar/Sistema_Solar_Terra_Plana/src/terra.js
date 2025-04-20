import * as THREE from 'three';
import { Domo } from './domo';

export class Terra{
    constructor(scene){
        this.radius = 20;
        this.geometry = new THREE.CircleGeometry(this.radius, 128,128);
        this.texture = new THREE.TextureLoader().load('/src/assets/textures/8k_earth_daymap.jpg');
        this.material = new THREE.MeshStandardMaterial({
            map: this.texture,
            roughness: 0.9,
            metalness: 0.1
        });
        
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 0, 0);
        this.mesh.rotation.x = -Math.PI/2;
        
        this.grupo = new THREE.Group();
        this.grupo.add(this.mesh ,new Domo(this.radius).grupo);
        this.grupo.rotation.x = Math.PI/7;

        scene.add(this.grupo);
    }
}