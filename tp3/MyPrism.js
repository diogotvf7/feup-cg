import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);

    this.slices = slices;  // Número de lados
    this.stacks = stacks;  // Número de andares

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [
      0, 0, 0,  //
      0, 0, 1   //
    ];
    this.indices = [];
    this.normals = [
      0, 0, -1,  //
      0, 0, 1    //
    ];

    const angle = 2 * Math.PI / this.slices;

    // Generate the base
    for (let i = 0; i < this.slices; i++) {
      const x = Math.cos(i * angle);
      const y = Math.sin(i * angle);

      this.vertices.push(x, y, 0);
      this.indices.push(i + 2, 0, (i + 1) % this.slices + 2);
      this.normals.push(0, 0, -1);
    }

    // Generate stacks
    // for (let i = 0;)

    // The defined indices (and corresponding vertices)
    // will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }
  /**
   * Called when user interacts with GUI to change object's complexity.
   * @param {integer} complexity - changes number of slices
   */
  updateBuffers(complexity) {
    this.slices = 3 +
        Math.round(
            9 * complexity);  // complexity varies 0-1, so slices varies 3-12

    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
  }
}
