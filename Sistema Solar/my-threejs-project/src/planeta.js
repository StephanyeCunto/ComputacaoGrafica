import * as THREE from 'three';

export class planeta{
    constructor(radius, texture, position){
        this.radius = radius;
        this.position = position;
        this.distanceSol = position.x;
        this.geometry = new THREE.SphereGeometry(this.radius, 64, 64);
        this.texture = texture;
        if(texture == "earth"){
            this.material = this.materialTerra(); 
        }else{
            this.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(this.texture) });
        }
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    }

    addToScene(scene){
        scene.add(this.mesh);
    }

    setOpacity(opacity){
        this.material.transparent = true;
        this.material.opacity = opacity;
    }

    setRotationSpeed(speed){
        this.mesh.rotation.y += speed;
    }

    rotate(){
        this.mesh.rotation.y += 0.01;
    }

    tick(){
        this.rotate();
        this.mesh.position.x = this.position.x + Math.sin(Date.now() * 0.001) * this.distanceSol*2;
        this.mesh.position.z = this.position.z + Math.cos(Date.now() * 0.001) * this.distanceSol*2;
    }

    materialTerra(){
        const texturaTerra = new THREE.TextureLoader().load('/src/img/8k_earth_daymap.jpg');
        const normalMap = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');
        const specularMap = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg');

        const material = new THREE.MeshPhongMaterial({
            map: texturaTerra,
            normalMap: normalMap,
            normalScale: new THREE.Vector2(1, 1),
            specularMap: specularMap,
            specular: new THREE.Color(0x333333), 
            shininess: 10
        });
        return material;
    }
}