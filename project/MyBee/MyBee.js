import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyAbdomen } from './MyAbdomen.js';
import { MyTorax } from './MyTorax.js';
import { MyHead } from './MyHead.js';
import { MyAntennae } from './MyAntennae.js';

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
  }
  display() {
    this.abdomen.display();
    this.torax.display();
    this.head.display();    
    // this.antennae.display();
  }
}
