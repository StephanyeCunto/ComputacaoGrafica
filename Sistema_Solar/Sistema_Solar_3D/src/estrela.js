import * as THREE from 'three';

export class Estrela {
    constructor() {
        this.largura = window.innerWidth;
        this.altura = window.innerHeight;
        const grupo = new THREE.Group();

        for (let i = 0; i < 30; i++) {
            grupo.add(this.criarEstrela(Math.random() * 2, this.randonPosition()));
        }

        this.Mesh = grupo;
    }

    randonPosition() {
        const x = (Math.random() - 0.5) * this.largura;
        const y = (Math.random() - 0.5) * this.altura;
        
        let z;
        do {
            z = (Math.random() - 0.5) * this.largura;
        } while (Math.abs(z) < 220);

        return { x, y, z };
    }

    criarEstrela(radius, position) {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([position.x, position.y, position.z]);

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({
            color: 0xd9d9d9,
            size: radius
        });

        return new THREE.Points(geometry, material);
    }
}
