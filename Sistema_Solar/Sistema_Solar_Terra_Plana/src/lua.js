import * as THREE from 'three';

export class Lua{
    constructor(radius){
        this.radius = radius /40;
        this.geometry = new THREE.SphereGeometry(this.radius, 64, 64);
        this.texture = "src/assets/textures/8k_moon.jpg";
        this.material = new THREE.MeshStandardMaterial({ 
            map: new THREE.TextureLoader().load(this.texture),
            roughness: 0.8,
            metalness: 0.1,
        });       
         
        this.Mesh = new THREE.Mesh(this.geometry, this.material);
        this.Mesh.position.set(-radius/2, radius/1.5, -radius/2);
    }

    tick(){
        this.Mesh.rotation.y += 0.005;

        this.Mesh.position.x = -Math.sin(Date.now() * 0.001) * (this.radius * 40 / 2);
        this.Mesh.position.z = -Math.cos(Date.now() * 0.001) * (this.radius * 40 / 2);
    }
}