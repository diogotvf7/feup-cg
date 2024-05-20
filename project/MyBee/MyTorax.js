import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import {MySphere} from '../MySphere.js';
import { MyBeeBody } from './MyBeeBody.js';

/**
 * MyTorax
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTorax extends CGFobject {
  constructor(scene) {
    super(scene);
    this.torax = new MyBeeBody(scene, 16, 16, .8);

    this.beeTexture = new CGFtexture(scene, 'images/textures/bee/torax.png');
    this.beeAppearance = new CGFappearance(scene);
    this.beeAppearance.setTexture(this.beeTexture);
    this.beeAppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.beeAppearance.setAmbient(0.1, 0.1, 0.1, 1);
    this.beeAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
    this.beeAppearance.setSpecular(0.1, 0.1, 0.1, 1);

  }
  display() {
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.translate(0, -1, 0.3);
    this.beeAppearance.apply();
    this.torax.display();
    this.scene.popMatrix();
  }
}
