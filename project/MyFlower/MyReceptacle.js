import {CGFappearance} from '../../lib/CGF.js';

// import {MySphere} from './MySphere.js';

/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - Texture of the panorama
 */
export class MyReceptacle {
  constructor(scene, texture) {
    this.scene = scene;
    this.texture = texture;

    this.apperance = new CGFappearance(scene);
    this.apperance.setTexture(this.texture);
    this.apperance.setTextureWrap('REPEAT', 'REPEAT');
    this.apperance.setEmission(1, 1, 1, 1);

    this.apperance.setAmbient(0, 0, 0, 0);
    this.apperance.setDiffuse(0, 0, 0, 0);
    this.apperance.setSpecular(0, 0, 0, 0);
    this.apperance.setShininess(0);
  }

  display() {
    this.scene.pushMatrix();

    // this.sphere.enableNormalViz();
    this.apperance.apply();

    this.scene.popMatrix();
  }
}
