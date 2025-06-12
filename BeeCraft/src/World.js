import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class World {
    constructor(onLoad) {
        const loader = new GLTFLoader();
        loader.load('/models/minecraft_overworld.glb', 
            (gltf) => {
                this.worldModel = gltf.scene;
                this.worldModel.position.set(0, 0, 0);
                this.worldModel.scale.set(300, 300, 300);

                this.worldModel.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                if (onLoad) onLoad(this.worldModel);
            }
        );
    }
}