import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyBezierCylinder } from '../MyBezierCylinder.js';

/**
 * MyStinger
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStinger extends CGFobject {
  constructor(scene) {
    super(scene);    
    this.stinger = new MyBezierCylinder(
      scene,
      .1,
      [ 
        [0, 0],
        [0, 0],
        [0, 1],
        [0, 1] 
      ],
      [
        [1, 0],
        [0, 0],
        [0, .1],
      ],
    );

    this.stingerAppearance = new CGFappearance(scene);
    this.stingerAppearance.setAmbient(0, 0, 0, 1);
    this.stingerAppearance.setDiffuse(1, 1, 1, 1);
    this.stingerAppearance.setSpecular(1, 1, 1, 1);
    this.stingerAppearance.setShininess(10);

  }
  display() {
    this.scene.pushMatrix();
    // this.scene.translate(0, 0, -.3);
    // this.scene.rotate(-6 * Math.PI / 10, 1, 0, 0);
    // this.scene.scale(.8, 2.3, .9);
    this.stingerAppearance.apply();
    this.stinger.display();
    this.scene.popMatrix();
  }
}
