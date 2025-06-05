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
        
        this.group = new THREE.Group();

        this.group.add(this.head(), this.creatStripes(), this.butt(), this.createAntenna(true), this.createAntenna(false), this.sting());
    }

    setupColors(){
        this.yellow = 0xfdd72b;
        this.black = 0x000000;
        this.brown = 0x0c0600;
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

    createAntenna(side){
        const positionX = this.headDepth/3;
        const positionY = this.headDepth/2;
        const positionZ =  -this.headDepth/2 - this.antennaDepth/2;
        const antennalower = this.antenna(side,positionX,positionY, positionZ);
        const antennaBottom = this.antenna(side,positionX,(positionY + positionY/4), (positionZ+ positionZ/4));

        const group = new THREE.Group();
        group.add(antennalower,antennaBottom);

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
}