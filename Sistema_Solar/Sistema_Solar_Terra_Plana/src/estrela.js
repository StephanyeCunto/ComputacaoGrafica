import * as THREE from 'three';

export class Estrela {
    constructor(radius) {
        this.radius = radius;
        const grupo = new THREE.Group();
        const color = [0xffffdd, 0xffeecc, 0xffffff, 0xffeedd];
        
        for (let i = 0; i < 2500; i++) {
            grupo.add(this.criarEstrela(Math.random() * 0.05, this.randonPosition(), color[Math.floor(Math.random() * color.length)]));
        }

        this.Mesh = grupo;
    }

    randonPosition() {     
        const theta = Math.random() * Math.PI * 2; // Ângulo de rotação horizontal ao redor do eixo Y (0 a 360)
        const phi =  Math.random() * Math.PI/2; // Ângulo de descida a partir do eixo Y (0 a 90)
        
        // Cálculo da posição em coordenadas esféricas
        // Coordenadas Esféricas = 3D
        const x =  this.radius * Math.sin(phi) * Math.cos(theta); // seno (0 a 90) * cosseno (0 a 360)
        const y = this.radius * Math.cos(phi); // cosseno (0 a 90)
        const z = this.radius * Math.sin(phi) * Math.sin(theta); // seno (0 a 90) * seno (0 a 360)
        
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
