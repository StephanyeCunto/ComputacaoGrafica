import * as THREE from 'three';

export class Domo{
    constructor(){
        this.geometry = new THREE.SphereGeometry(20, 128, 128, 0,  Math.PI * 2, 0, Math.PI / 2);

        this.material = new THREE.MeshStandardMaterial({color: 0x888888, 
          transparent: true, 
          opacity: 0.3,
          roughness: 0.1,
          metalness: 0.8
        });
    
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 0, 0);
    }
}