import * as THREE from 'three';

export class Bee{
    constructor(dimension){
        this.yellow = 0xfdd72b;
        this.black = 0x000000;
        this.dimension = dimension;
        this.numberList = 4;

        this.dephHead =  this.dimension/1.3;
        this.dephList =  this.dimension/8;
        this.dephButt = this.dimension/4;
        
        this.group = new THREE.Group();

        this.group.add(this.head(), this.createList(), this.butt());
    }

    head(){
        const geometry = new THREE.BoxGeometry(this.dimension, this.dimension, this.dephHead, 32, 32, 32);
        const material = new THREE.MeshToonMaterial({color : this.yellow});
        return new THREE.Mesh(geometry,material);
    }

    createList(){
        const groupList = new THREE.Group();
        for(let i = 0; i < this.numberList; i++) {
            (i%2) ? groupList.add(this.list(this.yellow,i)) : groupList.add(this.list(this.black,i));
        } 
        return groupList;
    }

    list(colorList,position){
        const geometry = new THREE.BoxGeometry(this.dimension, this.dimension, this.dephList, 32, 32, 32);
        const material = new THREE.MeshToonMaterial({color : colorList});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = this.dephHead/2 + (this.dephList * position) + this.dephList/2;
        return mesh;
    }

    butt(){
        const geometry = new THREE.BoxGeometry(this.dimension, this.dimension, this.dephButt , 32, 32, 32);
        const material = new THREE.MeshToonMaterial({color : this.black});
        const mesh = new THREE.Mesh(geometry,material);
        mesh.position.z = this.dephHead/2 + (this.dephList  * this.numberList) + this.dephButt/2;
        return mesh;
    }
}