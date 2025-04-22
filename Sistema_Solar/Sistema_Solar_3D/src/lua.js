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
        this.Mesh = new THREE.Mesh(this.geometry, this.material);
        this.Mesh.castShadow = true;
        this.Mesh.receiveShadow = true;
        this.Mesh.position.set(15, 0, 0);
    }

    tick(){
        this.Mesh.position.y = 0;
        this.Mesh.position.x = Math.sin(Date.now() * 0.005) * 15;
        this.Mesh.position.z = Math.cos(Date.now() * 0.005) * 15;
        this.Mesh.rotation.y += 0.01;
    }
}