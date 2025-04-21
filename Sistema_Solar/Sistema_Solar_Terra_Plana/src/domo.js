import * as THREE from 'three';
import { Estrela } from './estrela';
import { Sol } from './sol';
import { Lua } from './lua';

export class Domo{
    constructor(radius){
        this.radius = radius;
        this.geometry = new THREE.SphereGeometry(this.radius, 128, 128, 0,  Math.PI * 2, 0, Math.PI / 2);

        this.material = new THREE.MeshStandardMaterial({color: 0x888888, 
            transparent: true, 
            opacity: 0.5,
            roughness: 0.1,
            metalness: 0.8
        });
    
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 0, 0);

        this.grupo = new THREE.Group();
        this.grupo.add(this.mesh,(this.sol = new Sol(this.radius)).Mesh,new Estrela(this.radius).Mesh,(this.lua = new Lua(this.radius)).Mesh);
    }

    tick(){
        this.sol.tick();
        this.lua.tick();
    }
}