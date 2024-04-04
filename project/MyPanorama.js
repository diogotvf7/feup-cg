import { MySphere } from './MySphere.js';

/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama {
  constructor(scene, texture) {
    this.scene = scene;
    this.texture = texture;
    //this.sphere = new MySphere(scene, 20, 20, 200, -1); // slices, stacks, radius, normals direction
  }

  display() {
    this.scene.pushMatrix();

    this.texture.bind(0);
    this.sphere.display();
    this.texture.unbind(0);

    this.scene.popMatrix();
  }
}
