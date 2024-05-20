import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyAbdomen } from './MyAbdomen.js';
import { MyTorax } from './MyTorax.js';
import { MyHead } from './MyHead.js';
import { MyAntennae } from './MyAntennae.js';
import { Object } from '../Object.js';
import { Position } from '../Position.js';

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
  constructor(scene) {
    super(scene);

    this.abdomen = new MyAbdomen(scene);
    this.torax = new MyTorax(scene);
    this.head = new MyHead(scene);
    this.antennae = new MyAntennae(scene);

    this.scale = 2;
    this.speed = 1;

    this.moveAcceleration = 0;
    this.turnAcceleration = 0;

    this.oscillationSpeed = 2* Math.PI;

    this.position = new Position(0, 10, 0);
    this.orientation = 0;

    this.time = 0;
  }

  display() {
    this.scene.pushMatrix();

    // Transformations
    this.scene.translate(this.position.x, this.position.y, this.position.z);
    this.scene.scale(this.scale, this.scale, this.scale);

    // Body displayments
    this.abdomen.display();
    this.torax.display();
    this.head.display();    
   
    this.scene.popMatrix();
  }

  turn(v){
    //TODO
  }

  accelerate(v){
    //TODO
  }

  update(t){
    this.time = (t % 1000) / 1000;
    this.position.y = this.position.y + Math.sin(this.oscillationSpeed * this.time);
  }

  updateScale(s){
    this.scale = s;
  }

  updateSpeed(s){
    this.speed = s;
  }

}
