import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyCylinder } from '../MyCylinder.js';
import {MySphere} from '../MySphere.js';
import { MyBeeBody } from './MyBeeBody.js';

/**
 * MyAntennae
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAntennae extends CGFobject {
  constructor(scene) {
    super(scene);
    // this.antenna = new MyCylinder(scene, 2, 10, [
    //   [0, 0],
    //   [0, 0],
    //   [0.1, 1],
    //   [0.2, 1],
    // ]);
    this.antenna = new MyCylinder(scene, 2, 10, [
      [0, 0],
      [0, 0],
      [0.178, 1.165],
      [0.518, 10.549],
    ]);

    // black
    this.black = new CGFappearance(scene);
    this.black.setAmbient(0.5, 0.5, 0.5, 1);
    this.black.setDiffuse(0.5, 0.5, 0.5, 1);
    this.black.setSpecular(0.5, 0.5, 0.5, 1);
  }
  display() {
    // this.scene.pushMatrix();
    // this.black.apply();
    // this.antenna.display();
    // this.scene.popMatrix();

    this.antenna.display();
  }
}
