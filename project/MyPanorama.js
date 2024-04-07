import { CGFappearance } from "../lib/CGF.js";
import { MySphere } from './MySphere.js';

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - Texture of the panorama
 */
export class MyPanorama {
  constructor(scene, texture) {
    this.scene = scene;
    this.texture = texture;

    this.sphere = new MySphere(scene, 20, 20, 200, -1);
    
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

    //this.sphere.enableNormalViz();
    this.apperance.apply();
    this.sphere.display();

    this.scene.popMatrix();
  }
}
