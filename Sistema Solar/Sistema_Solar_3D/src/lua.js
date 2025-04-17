import * as THREE from 'three';

export class Lua{
    constructor (index){
        this.index = index;
        this.radius = 2 + index * 0.3;
        this.geometry = new THREE.SphereGeometry(this.radius, 64, 64);
        this.texture = "https://threejs.org/examples/textures/planets/moon_1024.jpg";
        this.material = new THREE.MeshStandardMaterial({ 
            map: new THREE.TextureLoader().load(this.texture),
            roughness: 0.8,
            metalness: 0.1,
          });        
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        console.log(this.position);
        this.mesh.position.set(15+10*index, 0, 0);
    }

    tick(){
        this.mesh.rotation.y += 0.01;
        this.mesh.position.x = Math.sin(Date.now() * 0.01) * 15 +(this.index*10);
        this.mesh.position.z = Math.cos(Date.now() * 0.01) * 15 +(this.index*10);
    }
}