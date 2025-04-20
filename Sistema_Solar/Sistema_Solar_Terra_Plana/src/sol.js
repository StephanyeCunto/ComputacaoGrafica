import * as THREE from 'three';

export class Sol{
    constructor(radius){
        this.radius = radius / 20;
        this.geometry = new THREE.SphereGeometry(this.radius, 64, 64);
        this.texture = new THREE.TextureLoader().load('/src/assets/textures/8k_sun.jpg');
        this.material = new THREE.MeshBasicMaterial({
                color: 0xffdd77,
                map: this.texture
            });
        this.Mesh = new THREE.Mesh(this.geometry, this.material);
        this.Mesh.position.set(radius/1.5, radius/1.5, 0);
    }

    tick(){
        this.Mesh.rotation.y += 0.005;

        this.Mesh.position.x = Math.sin(Date.now() * 0.001) * (this.radius* 20 / 1.5);
        this.Mesh.position.z = Math.cos(Date.now() * 0.001) * (this.radius * 20 / 1.5);
    }
}