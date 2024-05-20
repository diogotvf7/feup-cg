import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyBeeBody } from './MyBeeBody.js';

/**
 * MyAbdomen
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAbdomen extends CGFobject {
  constructor(scene) {
    super(scene);    
    this.torax = new MyBeeBody(scene, 16, 32, 1);


    this.beeTexture = new CGFtexture(scene, 'images/textures/bee/fur2.png');
    this.beeAppearance = new CGFappearance(scene);
    this.beeAppearance.setTexture(this.beeTexture);
    this.beeAppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.beeAppearance.setAmbient(0.1, 0.1, 0.1, 1);
    this.beeAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
    this.beeAppearance.setSpecular(0.1, 0.1, 0.1, 1);

  }
  display() {
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 3, 1, 0, 0);
    this.beeAppearance.apply();
    this.torax.display();
    this.scene.popMatrix();
  }
}
