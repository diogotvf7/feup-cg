import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import {MySphere} from '../MySphere.js';
import { MyBeeBody } from './MyBeeBody.js';

/**
 * MyHead
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHead extends CGFobject {
  constructor(scene) {
    super(scene);
    this.torax = new MySphere(scene, 16, 16, .4, 1, .7, 1.5);
    this.eye = new MySphere(scene, 16, 16, .3, 1, .7, 1.5);

    this.beeTexture = new CGFtexture(scene, 'images/textures/bee/fur2.png');
    this.beeAppearance = new CGFappearance(scene);
    this.beeAppearance.setTexture(this.beeTexture);
    this.beeAppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.beeAppearance.setAmbient(0.1, 0.1, 0.1, 1);
    this.beeAppearance.setDiffuse(0.9, 0.9, 0.1, 1);
    this.beeAppearance.setSpecular(0.1, 0.1, 0.1, 1);

    // black eye
    this.eyeTexture = new CGFtexture(scene, 'images/textures/bee/eye.png');
    this.eyeAppearance = new CGFappearance(scene);
    this.eyeAppearance.setTexture(this.eyeTexture);
    this.eyeAppearance.setAmbient(0.1, 0.1, 0.1, 1);
    this.eyeAppearance.setDiffuse(0.1, 0.1, 0.1, 1);
    this.eyeAppearance.setSpecular(0.1, 0.1, 0.1, 1);


  }
  display() {
    this.scene.pushMatrix();
    this.scene.translate(0, 0.3, 2);
    this.scene.rotate(5 * Math.PI / 3, 1, 0, 0);
    this.beeAppearance.apply();
    this.torax.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.12, 0.3, 2.1);
    this.scene.rotate(5 * Math.PI / 3, 1, 0, 0);
    this.eyeAppearance.apply();
    this.eye.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.12, 0.3, 2.1);
    this.scene.rotate(5 * Math.PI / 3, 1, 0, 0);
    this.eyeAppearance.apply();
    this.eye.display();
    this.scene.popMatrix();
  }
}
