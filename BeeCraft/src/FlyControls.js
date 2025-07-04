import * as THREE from 'three';

export class FlyControls {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement;
        
        this.moveSpeed = 0.5;
        this.rotationSpeed = 0.002;
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseDown = false;
        
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        
        this.connect();
    }

    connect() {
        this.boundMouseMove = (event) => this.onMouseMove(event);
        this.boundMouseDown = (event) => this.onMouseDown(event);
        this.boundMouseUp = (event) => this.onMouseUp(event);
        
        this.domElement.addEventListener('mousemove', this.boundMouseMove);
        this.domElement.addEventListener('mousedown', this.boundMouseDown);
        this.domElement.addEventListener('mouseup', this.boundMouseUp);
    }
    
    disconnect() {
        this.domElement.removeEventListener('mousemove', this.boundMouseMove);
        this.domElement.removeEventListener('mousedown', this.boundMouseDown);
        this.domElement.removeEventListener('mouseup', this.boundMouseUp);
    }
    
    onMouseMove(event) {
        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;
        
        if (this.isMouseDown) {
            const euler = new THREE.Euler(0, 0, 0, 'YXZ');
            euler.setFromQuaternion(this.camera.quaternion);
            
            euler.y -= movementX * this.rotationSpeed;
            euler.x -= movementY * this.rotationSpeed;
                        
            this.camera.quaternion.setFromEuler(euler);
        }
        
        this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    
    onMouseDown(event) {
        if (event.button === 0) { 
            this.isMouseDown = true;
            this.domElement.requestPointerLock();
        }
    }
    
    onMouseUp(event) {
        if (event.button === 0) {
            this.isMouseDown = false;
            document.exitPointerLock();
        }
    }

    update() {
        this.direction.set(0, 0, 0);
        
        this.direction.x = this.mouseX * this.moveSpeed; 
        this.direction.y = this.mouseY * this.moveSpeed;
        this.direction.z = -this.moveSpeed;
        
        this.velocity.copy(this.direction);
        this.velocity.applyQuaternion(this.camera.quaternion);
        
        this.camera.position.add(this.velocity);
    }
}