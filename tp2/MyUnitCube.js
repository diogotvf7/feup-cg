import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [
      -0.5, -0.5, 0.5,   // bot left front
      0.5,  -0.5, 0.5,   // bot right front
      0.5,  -0.5, -0.5,  // bot right back
      -0.5, -0.5, -0.5,  // bot left back
      -0.5, 0.5,  0.5,   // top left front
      0.5,  0.5,  0.5,   // top right front
      0.5,  0.5,  -0.5,  // top right back
      -0.5, 0.5,  -0.5,  // top left back
    ];

    // Counter-clockwise reference of vertices
    this.indices = [
      0, 3, 2,  // | Bot face   |
      2, 1, 0,  // |____________|
      0, 1, 5,  // | Front face |
      5, 4, 0,  // |____________|
      0, 4, 7,  // | Left face  |
      7, 3, 0,  // |____________|
      3, 7, 6,  // | Back face  |
      6, 2, 3,  // |____________|
      2, 6, 5,  // | Right face |
      5, 1, 2,  // |____________|
      4, 5, 6,  // | Top face   |
      6, 7, 4,  // |____________|
    ];

    // The defined indices (and corresponding vertices)
    // will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }
}
