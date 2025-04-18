import * as THREE from 'three';

export class Anel{
    constructor(radius){
        this.radius = radius;
        this.geometry = new THREE.RingGeometry(this.radius + 2, this.radius + 6 ,64,64);        
        this.texture = 'src/img/8k_saturn_ring_alpha.png';
                
        this.material = new THREE.MeshPhongMaterial({
            map:new THREE.TextureLoader().load(this.texture),
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,     
            alphaTest: 0.1,      
            blending: THREE.AdditiveBlending,  
            emissive: 0x222222,    
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = (-Math.PI / 2) - 0.2;
    }

    tick(){
        this.mesh.rotation.z += 0.01;
    }
}