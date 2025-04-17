import * as THREE from 'three';

export class planeta{
    constructor(radius, texture, position,scene){
        this.radius = radius;
        this.position = position;
        this.distanceSol = position.x;
        this.geometry = new THREE.SphereGeometry(this.radius, 64, 64);
        this.texture = texture;
        this.speed = 0.01;
        if(texture == "earth"){
            this.material = this.materialTerra(); 
        }else{
            this.material = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load(this.texture), 
                roughness: 0.9,
                metalness: 0.1 });
        }
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.addToScene(scene);
    }

    addToScene(scene){
        scene.add(this.mesh);
    }

    setOpacity(opacity){
        this.material.transparent = true;
        this.material.opacity = opacity;
    }

    setSpeed(speed){
        this.speed = speed;
    }

    rotate(){
        this.mesh.rotation.y += this.speed;
    }

    tick(){
        this.rotate();
        this.mesh.position.x = this.position.x + Math.sin(Date.now() * 0.001) * this.distanceSol*2;
        this.mesh.position.z = this.position.z + Math.cos(Date.now() * 0.001) * this.distanceSol*2;    
    }

    materialTerra(){
        const texturaTerra = new THREE.TextureLoader().load('/src/img/8k_earth_daymap.jpg');
        const normalMap = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');
        const material = new THREE.MeshStandardMaterial({
            map: texturaTerra,
            normalMap: normalMap,
            normalScale: new THREE.Vector2(1, 1),
            roughness: 0.9,
            metalness: 0.1
        });
        return material;
    }
}