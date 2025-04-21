import * as THREE from 'three';
import { Domo } from './domo';
import { Atmosfera } from './atmosfera';

export class Terra{
    constructor(){
        this.radius = 20;
        this.geometry = new THREE.CircleGeometry(this.radius, 128,128);
        this.texture = new THREE.TextureLoader().load('/src/assets/textures/8k_earth_daymap.jpg');
        this.normalMap = new THREE.TextureLoader().load('/src/assets/textures/earth_normal_2048.jpg');
        this.material = new THREE.MeshStandardMaterial({
            map: this.texture,
            normalMap: this.normalMap,
            normalScale: new THREE.Vector2(1, 1),
            roughness: 0.9,
            metalness: 0.1
        });
        
        this.Mesh = new THREE.Mesh(this.geometry, this.material);

        this.grupoTerraAtmosfera = new THREE.Group();
        this.grupoTerraAtmosfera.add(this.Mesh,(this.Atmosfera = new Atmosfera(this.radius)).Mesh);

        this.grupoTerraAtmosfera.position.set(0, 0, 0);
        this.grupoTerraAtmosfera.rotation.x = -Math.PI/2;
        
        this.grupo = new THREE.Group();

        this.grupo.add(this.grupoTerraAtmosfera,(this.domo = new Domo(this.radius)).grupo);
    }

    tick(){
        this.domo.tick();
       // this.Atmosfera.tick();
    }
}