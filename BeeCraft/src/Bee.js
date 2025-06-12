import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Bee {
    constructor(onLoad) {
        this.beeModel = null;
        this.wingLeft = null;
        this.wingRight = null;
        this.clock = new THREE.Clock(); 

        const loader = new GLTFLoader();
        loader.load('/models/bee_minecraft.glb', 
            (gltf) => {
                this.beeModel = gltf.scene;
                this.beeModel.position.set(180, 150, 180);
                this.beeModel.scale.set(1, 1, 1);

                this.beeModel.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                    
                    if (child.name === "RingL_4" || child.name === "WingLeft" ) this.wingLeft = child;
                    else if (child.name === "RingR_5" || child.name === "WingRight" ) this.wingRight = child;
                });
            if (onLoad) onLoad(this.beeModel);
            }
        );
    }

    animate() {
        const time = this.clock.getElapsedTime();
        
        const flapFrequency = 2;
        const flapAngle = Math.sin(time * flapFrequency) * 0.6; 
            
        const phaseOffset = Math.sin(time * 2) * 0.05;
            
       // this.wingLeft.rotation.z = flapAngle + phaseOffset;
       // this.wingRight.rotation.z = -flapAngle - phaseOffset;

       // this.wingLeft.scale.x = -1;

       // this.beeModel.position.y = Math.sin(time * 2) * 0.3;
      //  this.beeModel.rotation.x = Math.sin(time * 1.5) * 0.02;
      //  this.beeModel.rotation.z = Math.sin(time * 1.8) * 0.01;
    }
}