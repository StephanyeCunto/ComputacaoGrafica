import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Sky {
    constructor(onLoad) {
        const loader = new GLTFLoader();
        loader.load('/models/skybox_minecraft_daylight.glb', 
            (gltf) => {
                this.SkyModel = gltf.scene;
                this.SkyModel.position.set(200, 0, 0);
                this.SkyModel.scale.set(500, 500, 500);

                this.SkyModel.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                if (onLoad) onLoad(this.SkyModel);
            }
        );
    }
}