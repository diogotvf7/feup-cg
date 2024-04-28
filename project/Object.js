import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices around the sphere
 * @param stacks - Number of stacks along the sphere
 * @param radius - Sphere radius
 * @param scaleX - Scale factor on the x-axis
 * @param scaleY - Scale factor on the y-axis
 * @param scaleZ - Scale factor on the z-axis
 */
export class Object extends CGFobject {
  constructor(scene) {
    super(scene);
    this.scene = scene;
  }

  display(){
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0); //TODO (thePeras): change this for the intended position
    super.display();
    this.scene.popMatrix();
  }

  /**
   * Called when user interacts with GUI to change object's complexity.
   * @param {integer} complexity - changes number of slices
   */
  upda
  teBuffers(complexity) {
    this.slices = 3 +
      Math.round(
        9 * complexity);  // complexity varies 0-1, so slices varies 3-12

    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
  }
}
