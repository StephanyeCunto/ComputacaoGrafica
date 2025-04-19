import * as THREE from 'three';

export class Estrela{
    constructor(){
        this.largura = window.innerWidth;
        this.altura = window.innerHeight;
        const grupo = new THREE.Group();
        for(let i = 0; i < 100; i++){
            grupo.add(this.criarEstrela(Math.random()*2, this.randonPosition()));
        }
        this.Mesh = grupo;
    }

    randonPosition() {
        const x = (Math.random() - 0.5) * this.largura;
        const y = (Math.random() - 0.5) * this.altura;
        let z;
        do {
            z = (Math.random() - 0.5) * this.largura;
         } while ((z > -220 && z< 220) || (x > -220 && x< 220) ); 
        return new THREE.Vector3(x, y, z);
    }
    

    criarEstrela(radius, position){
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array(3);

        vertices[0] = position.x;
        vertices[1] = position.y;
        vertices[2] = position.z;

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({
            color: 0xd9d9d9,
            size: radius
          });        
        const star = new THREE.Points(geometry, material);
        return star;
    }
}