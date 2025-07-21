import * as THREE from 'three';

export class Atmosfera{
    constructor(radius){
        this.radius = radius;
        this.geometry = new THREE.SphereGeometry(this.radius + 0.02, 64, 64);
        this.texture = 'src/assets/textures/earth_clouds_1024.png';
        this.material= new THREE.MeshStandardMaterial({ map:new THREE.TextureLoader().load(this.texture), 
            roughness: 0.9,
            metalness: 0.1 ,
            transparent: true,
            opacity: 0.8
        });
        this.Mesh = new THREE.Mesh(this.geometry, this.material);
        this.Mesh.receiveShadow = true;
    }

    tick(){
        this.Mesh.rotation.y += 0.02;
    }
}