import * as THREE from 'three';

export class Atmosfera{
    constructor(radius){
        this.radius = radius;
        this.geometry = new THREE.CircleGeometry(this.radius , 128,128);
        this.texture = new THREE.TextureLoader().load('/src/assets/textures/earth_clouds_1024.png');
        this.material = new THREE.MeshStandardMaterial({ map:this.texture, 
            roughness: 0.9,
            metalness: 0.1 ,
            transparent: true,
            opacity: 0.8
        });

        this.Mesh = new THREE.Mesh(this.geometry, this.material);
    }

    tick() {
        // Rotaciona a atmosfera suavemente no eixo Z (porque está deitada)
        this.Mesh.rotation.z += 0.0005;
    }
}