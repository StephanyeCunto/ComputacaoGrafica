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
        this.sol = new THREE.Mesh(this.geometry, this.material);
        this.luzSolar = new THREE.PointLight(0xf9e8c3, 4, 25, 0.3);
        this.Mesh = new THREE.Group();
        this.Mesh.add(this.sol, this.luzSolar);
        this.Mesh.position.set(radius/2, radius/1.5, radius/2);

    }

    tick(){
        this.Mesh.rotation.y += 0.005;
        this.Mesh.position.x = Math.sin(Date.now() * 0.001) * (this.radius* 20 / 2);
        this.Mesh.position.z = Math.cos(Date.now() * 0.001) * (this.radius * 20 / 2);
    }
}