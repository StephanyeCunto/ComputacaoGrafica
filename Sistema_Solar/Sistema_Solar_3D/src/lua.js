import * as THREE from 'three';

export class Lua{
    constructor (){
        this.radius = 2;
        this.geometry = new THREE.SphereGeometry(this.radius, 64, 64);
        this.texture = "src/assets/textures/8k_moon.jpg";
        this.material = new THREE.MeshStandardMaterial({ 
            map: new THREE.TextureLoader().load(this.texture),
            roughness: 0.8,
            metalness: 0.1,
          });        
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(15, 0, 0);
    }

    tick(){
        this.mesh.position.y = 0;
        this.mesh.position.x = Math.sin(Date.now() * 0.005) * 15;
        this.mesh.position.z = Math.cos(Date.now() * 0.005) * 15;
    }
}