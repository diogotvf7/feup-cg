import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyBezierCylinder } from '../MyBezierCylinder.js';

/**
 * MyAbdomen
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAbdomen extends CGFobject {
  constructor(scene) {
    super(scene);    
    this.abdomen = new MyBezierCylinder(
      scene,
      1,
      [ 
        [0, 0],
        [0, 0],
        [0, 1],
        [0, 1] 
      ],
      [
        [0, 0],
        [1.5, 0],
        [.2, 1],
        [.8, 1],
        [0, 1],
      ],
    );

    this.beeTexture = new CGFtexture(scene, 'images/textures/bee/abdomen-fur.png');
    this.beeAppearance = new CGFappearance(scene);
    this.beeAppearance.setTexture(this.beeTexture);
    this.beeAppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.beeAppearance.setAmbient(0.1, 0.1, 0.1, 1);
    this.beeAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
    this.beeAppearance.setSpecular(0.1, 0.1, 0.1, 1);

  }
  display() {
    this.scene.pushMatrix();
    this.beeAppearance.apply();
    this.abdomen.display();
    this.scene.popMatrix();
  }
}
