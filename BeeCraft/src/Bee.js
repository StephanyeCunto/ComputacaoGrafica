import * as THREE from 'three';

export class Bee {
    let wingLeft = null;
    let wingRight = null;
    let beeModel = null;
    const leg = [];

    construtor() {
        const loader = new GLTFLoader();
        loader.load('/models/bee_minecraft.glb', 
            (gltf) => {
                beeModel = gltf.scene;
                beeModel.position.set(0, 0, 0);
                beeModel.scale.set(3, 3, 3);

                beeModel.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                    
                    if (child.name === "RingL_4" || child.name === "WingLeft" ) wingLeft = child;
                    else if (child.name === "RingR_5" || child.name === "WingRight" ) wingRight = child;
                    else if(child.name?.startsWith("leg")) leg.push(child);
                });

                scene.add(beeModel);
            }
        );
    }

a {
    const clock = new THREE.Clock();

        const time = clock.getElapsedTime();
    
    if (wingLeft && wingRight) {
      const flapFrequency = 2;
      const flapAngle = Math.sin(time * flapFrequency) * 0.6; 
        
      const phaseOffset = Math.sin(time * 2) * 0.05;
        
      wingLeft.rotation.z = flapAngle + phaseOffset;
      wingRight.rotation.z = -flapAngle - phaseOffset;
        
      wingLeft.rotation.y = Math.sin(time * flapFrequency * 0.5) * 0.1;
      wingRight.rotation.y = Math.sin(time * flapFrequency * 0.5) * 0.1;

      wingLeft.scale.x = -1;
    }
    
    if (beeModel) {
        beeModel.position.y = Math.sin(time * 2) * 0.3;
        beeModel.rotation.x = Math.sin(time * 1.5) * 0.02;
        beeModel.rotation.z = Math.sin(time * 1.8) * 0.01;
    }
}
}