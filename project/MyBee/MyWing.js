import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyBezierCylinder } from '../MyBezierCylinder.js';

/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWing extends CGFobject {
  constructor(scene) {
    super(scene);    
    this.wing = new MyBezierCylinder(
      scene,
      .1,
      [ 
        [0,4],                  // curva para as asas
        [0,5],
        [13,10],
        [11.5,8],
        [10,6],
        [9,5.5],
        [7.5,5.5],
        [9,5.5],
        [10,5.5],
        [8,3],
        [6,2],
        [0,2],
        [0,3],
        [0,4],
      ],
      [
        [1, 0],
        [0, 0],
        [0, .1],
      ],
    );

    this.wingAppearance = new CGFappearance(scene);
    this.wingAppearance.setAmbient(0, 0, 0, 1);
    this.wingAppearance.setDiffuse(.3, .3, .3, 1);
    this.wingAppearance.setSpecular(1, 1, 1, 1);

  }
  display() {
    this.scene.pushMatrix();
    // this.scene.translate(0, 0, -.3);
    // this.scene.rotate(-6 * Math.PI / 10, 1, 0, 0);
    // this.scene.scale(.8, 2.3, .9);
    this.wingAppearance.apply();
    this.wing.display();
    this.scene.popMatrix();
  }
}
