import * as THREE from 'three';

export class Anel{
    constructor(radius){
        this.radius = radius;
        this.geometry = new THREE.RingGeometry(this.radius + 0.2* this.radius, this.radius + 0.6 * this.radius ,64,64);        
        this.texture = 'src/assets/textures/anel.png';   
        this.material = new THREE.MeshPhongMaterial({
            map:new THREE.TextureLoader().load(this.texture),
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,  
            side: THREE.DoubleSide,
            emissive: 0x222222   
        });
        this.Mesh = new THREE.Mesh(this.geometry, this.material);
        this.Mesh.rotation.x = (Math.PI / 2) + 4/ radius;
        this.Mesh.receiveShadow = true;
    }

    tick(){
        this.Mesh.rotation.z += 0.01;
    }
}