import * as THREE from 'three';

export class Estrela {
    constructor(scene) {
        this.largura = window.innerWidth;
        this.altura = window.innerHeight;
        const grupo = new THREE.Group();
        const color = [0xffffdd, 0xffeecc, 0xffffff, 0xffeedd];
        
        for (let i = 0; i < 10000; i++) {
            grupo.add(this.criarEstrela(Math.random() * 2, this.randonPosition(), color[Math.floor(Math.random() * color.length)]));
        }

        this.Mesh = grupo;
        scene.add(this.Mesh);
    }

    randonPosition() {
        const z = (Math.random() - 0.5) * this.largura;
        
        let x;
        let y;
        do {
            x = (Math.random() - 0.5) * this.largura;
            y = (Math.random() - 0.5) * this.altura;
        } while (Math.abs(x) < 220 && Math.abs(y) < 220 && Math.abs(z) < 220);

        return { x, y, z };
    }

    criarEstrela(radius, position, color) {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([position.x, position.y, position.z]);

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({
            color: color,
            size: radius
        });

        return new THREE.Points(geometry, material);
    }
}
