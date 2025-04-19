import * as THREE from 'three';

export class Sol{
    constructor(){
        this.radius = 20;
        this.geometry = new THREE.SphereGeometry(this.radius, 64, 64);
        this.texture = new THREE.TextureLoader().load('/src/assets/textures/8k_sun.jpg');
        this.material = new THREE.MeshBasicMaterial({
                color: 0xffff00,
                map: this.texture
              });
        this.Mesh = new THREE.Mesh(this.geometry, this.material);
        this.Mesh.position.set(0, 0, 0);
    }

    tick(){
        this.Mesh.rotation.y+= 0.001;
    }
}