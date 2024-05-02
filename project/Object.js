import { CGFobject } from '../lib/CGF.js';

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
  constructor(scene, position = new Position(0, 0, 0)) {
    super(scene);
    this.scene = scene;
    this.position = position;
  }

  display(){
    this.scene.pushMatrix();
    this.scene.translate(this.position.x, this.position.y, this.position.z);
    super.display();
    this.scene.popMatrix();
  }

  //TODO: (thePeras) Methods to change position
  //updateTexCoordsGLBuffers
}
