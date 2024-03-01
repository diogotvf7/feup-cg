import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);

    this.slices = slices; // Número de lados
    this.stacks = stacks; // Número de andares

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    // Generate vertices and normals
    for (let i = 0; i < this.slices; i++) {
      let angle = i * 2 * Math.PI / this.slices;
      let x = Math.cos(angle);
      let y = Math.sin(angle);

      let nextAngle = (i + 1) * 2 * Math.PI / this.slices;
      let nextX = Math.cos(nextAngle);
      let nextY = Math.sin(nextAngle);

      this.vertices.push(x, y, 0); // z = 0
      this.vertices.push(x, y, 1); // z = 1
      this.vertices.push(nextX, nextY, 0);
      this.vertices.push(nextX, nextY, 1);

      //TODO: Calculate normals

      //TODO: Calculate indices
    }

    // The defined indices (and corresponding vertices)
    // will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }
}
