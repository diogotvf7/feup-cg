import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyAbdomen } from './MyAbdomen.js';
import { MyTorax } from './MyTorax.js';
import { MyHead } from './MyHead.js';
import { Object } from '../Object.js';
import { Position } from '../Position.js';
import { MyStinger } from './MyStinger.js';

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
  constructor(scene) {
    super(scene);

    this.head = new MyHead(scene);
    this.torax = new MyTorax(scene);
    this.abdomen = new MyAbdomen(scene);
    this.stinger = new MyStinger(scene);

    this.scale = 2;
    this.speed = 0;
    this.turnSpeed = Math.PI / 30;

    this.position = new Position(0, 10, 0);
    this.orientation_xz = Math.PI / 2;

    this.time = 0;
  }

  display() {
    this.scene.pushMatrix();

    // Transformations
    // this.scene.translate(this.position.x, this.position.y, this.position.z);
    // this.scene.rotate(this.orientation_xz, 0, 1, 0); // Rotate the bee based on orientation
    // this.scene.scale(this.scale, this.scale, this.scale);

    // Body displayments    
    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0.3);
    this.scene.scale(1.75, 1.75, 1.75);
    this.scene.rotate(3 * Math.PI / 4, 1, 0, 0);
    this.head.display();    
    this.scene.popMatrix();

    this.torax.display();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -.3);
    this.scene.rotate(-6 * Math.PI / 10, 1, 0, 0);
    this.scene.scale(.8, 2.3, .9);
    this.abdomen.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -.7, -2.42);
    this.scene.rotate(-6 * Math.PI / 10, 1, 0, 0);    
    this.stinger.display();
    this.scene.popMatrix();
  }
  turn(angle){
    this.orientation_xz += angle;
  }
  accelerate(value){
    this.speed += value;
  }
  decelerate(value){
    this.speed -= value;
    if(this.speed < 0) {
      this.speed = 0;
    }
  }
  update(t){
    this.time = (t % 1000) / 1000;
    this.position.y = this.position.y + 0.2 * Math.sin(2*Math.PI * this.time);

    const pressedKeys = this.scene.gui.getPressedKeys();
    if(pressedKeys.length > 0) {
      if(pressedKeys.includes("w")) {
        this.accelerate(0.5);
      }
      if(pressedKeys.includes("s")) {
        this.decelerate(0.5);
      }

      if(pressedKeys.includes("a")) {
        this.turn(this.turnSpeed);
      }

      if(pressedKeys.includes("d")) {
        this.turn(-this.turnSpeed);
      }

      if(pressedKeys.includes("r")) {
        this.position = new Position(0, 10, 0);
        this.orientation_xz = Math.PI / 2;
        this.speed = 0;
      }
    }

    this.position.x += this.speed * Math.sin(this.orientation_xz);
    this.position.z += this.speed * Math.cos(this.orientation_xz);
  }

  updateScale(s){
    this.scale = s;
  }

  updateSpeed(s){
    this.speed = s;
  }

}
