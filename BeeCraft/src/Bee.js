import * as THREE from 'three';

export class Bee{
    constructor(dimension){
        this.setupColors();

        this.dimension = dimension;

        this.stripeCount = 4;
        this.stripeDepth =  this.dimension/8;
        this.stripeDepthCount = this.stripeDepth * this.stripeCount;

        this.headDepth =  this.dimension/1.3;
        this.buttDepth = this.dimension/4;

        this.antennaDepth = this.dimension/4; 
        this.antennaWidth = this.dimension/10; 
        this.antennaHeight = this.dimension/10;

        this.stingDepth = this.dimension/4;
        this.stingWidth = this.dimension/20;
        this.stingHeight = this.dimension/10;

        this.pawDepth = this.dimension/10;
        this.pawWidth = this.dimension/10;
        this.pawHeight = this.dimension/1.5;

        this.eyeDepth = this.headDepth/3;
        this.eyeWidth = this.dimension/2.5;
        this.eyeHeight = this.dimension/2.5;
        
        this.group = new THREE.Group();

        this.group.add(this.head(), this.creatStripes(), this.butt(), this.createAntenna(), this.sting(), this.createPaw(), this.createEye());
    }

    setupColors(){
        this.yellow = 0xfdd72b;
        this.black = 0x000000;
        this.brown = 0x0c0600;
        this.white = 0xffffff;
    }

    head(){
        const geometry = new THREE.BoxGeometry(this.dimension, this.dimension, this.headDepth, 1, 1, 1);
        const material = new THREE.MeshToonMaterial({color : this.yellow});
        return new THREE.Mesh(geometry,material);
    }

    creatStripes(){
        const groupList = new THREE.Group();
        for(let i = 0; i < this.stripeCount; i++) {
            (i%2) ? groupList.add(this.stripe(this.yellow,i)) : groupList.add(this.stripe(this.black,i));
        } 
        return groupList;
    }

    stripe(colorList,position){
        const geometry = new THREE.BoxGeometry(this.dimension, this.dimension, this.stripeDepth, 1, 1, 1);
        const material = new THREE.MeshToonMaterial({color : colorList});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = this.headDepth/2 + (this.stripeDepth * position) + this.stripeDepth/2;
        return mesh;
    }

    butt(){
        const geometry = new THREE.BoxGeometry(this.dimension, this.dimension, this.buttDepth , 1, 1, 1);
        const material = new THREE.MeshToonMaterial({color : this.black});
        const mesh = new THREE.Mesh(geometry,material);
        mesh.position.z = this.headDepth/2 + this.stripeDepthCount + this.buttDepth/2;
        return mesh;
    }

    createAntenna(){
        const positionX = this.headDepth/3;
        const positionY = this.headDepth/2;
        const positionZ =  -this.headDepth/2 - this.antennaDepth/2;
        const antennaLowerRigth = this.antenna(true,positionX,positionY, positionZ);
        const antennaBottomRigth = this.antenna(true,positionX,(positionY + positionY/4), (positionZ+ positionZ/4));

        const antennaLowerLeft = this.antenna(false,positionX,positionY, positionZ);
        const antennaBottomLeft = this.antenna(false,positionX,(positionY + positionY/4), (positionZ+ positionZ/4));

        const group = new THREE.Group();
        group.add(antennaLowerRigth,antennaBottomRigth,antennaLowerLeft,antennaBottomLeft);

        return group;

    }

    antenna(side, positionX, positionY, positionZ){
        const geometry = new THREE.BoxGeometry(this.antennaWidth , this.antennaHeight, this.antennaDepth , 1, 1, 1);
        const material = new THREE.MeshToonMaterial({color : this.black});
        const mesh = new THREE.Mesh(geometry,material);
        mesh.position.z = positionZ;
        mesh.position.y = positionY;
        (side) ? mesh.position.x = positionX: mesh.position.x = -positionX;

        return mesh;
    }

    sting(){
        const geometry = new THREE.BoxGeometry( this.stingWidth, this.stingHeight, this.stingDepth, 1, 1, 1);
        const material = new THREE.MeshToonMaterial({color : this.brown});
        const mesh = new THREE.Mesh(geometry,material);
        mesh.position.z = (this.headDepth/2 + this.stripeDepthCount + this.buttDepth) + this.stingDepth/2;
        return mesh;
    }

    createPaw(){
        const group = new THREE.Group();
        const pawFrontRight = this.paw(true, this.headDepth/10);
        const pawFrontLeft = this.paw(false, this.headDepth/10);

        const pawMiddleRigth = this.paw(true, this.headDepth/10 + this.headDepth/2);
        const pawMiddleLeft = this.paw(false, this.headDepth/10 + this.headDepth/2);
        

        const pawLastRigth = this.paw(true, this.headDepth/10 + this.headDepth);
        const pawLastLeft = this.paw(false, this.headDepth/10 + this.headDepth);

        group.add(pawFrontRight, pawFrontLeft, pawMiddleRigth, pawMiddleLeft, pawLastRigth, pawLastLeft);

        return group;
    }

    paw(side, positionZ){
        const geometry = new THREE.BoxGeometry(this.pawWidth, this.pawHeight, this.pawDepth, 1, 1, 1);
        const material = new THREE.MeshToonMaterial({color : this.brown});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -this.headDepth/2 - this.pawDepth/2;
        (side)? mesh.position.x = this.headDepth/2 - this.pawDepth/2 : mesh.position.x =  -this.headDepth/2 + this.pawDepth/2;
        mesh.position.z = positionZ;
        return mesh;
    }

    createEye(){
        const group = new THREE.Group();

        group.add(this.eye(true),this.eye(false));

        return group;
    }

    eye(side){
        const geometry = new THREE.BoxGeometry(this.eyeWidth, this.eyeHeight, this.eyeDepth, 1, 1, 1);
        const material = new THREE.MeshToonMaterial({color: this.black});
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = this.headDepth/8 - this.eyeHeight/4;
        mesh.position.z = -this.headDepth/2 + this.eyeDepth/2.1;

        (side) ? mesh.position.x = this.headDepth/2.5 : mesh.position.x = -this.headDepth/2.5;


        const geometryPoitn = new THREE.BoxGeometry(this.eyeWidth/2, this.eyeHeight/2, this.eyeDepth, 1, 1, 1);
        const materiaPoitn = new THREE.MeshToonMaterial({ color: this.white});
        const meshPoint = new THREE.Mesh(geometryPoitn,materiaPoitn);

        meshPoint.position.y = this.headDepth/8;
        meshPoint.position.z = -this.headDepth/2 + this.eyeDepth/2.3;

        (side) ? meshPoint.position.x = this.headDepth/4 : meshPoint.position.x = -this.headDepth/4;

        const group = new THREE.Group();
        group.add(mesh, meshPoint);
        return group;
    }
}