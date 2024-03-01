import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
  constructor(scene, nDivs) {
    super(scene);
    nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

    this.nDivs = nDivs;
    this.patchLength = 1.0 / nDivs;

    this.initBuffers();
  }

  initBuffers() {
    const vertices = [
      0.5,  0.5,  0.5,   // 0
      0.5,  0.5,  -0.5,  // 1
      0.5,  -0.5, 0.5,   // 2
      0.5,  -0.5, -0.5,  // 3
      -0.5, 0.5,  0.5,   // 4
      -0.5, 0.5,  -0.5,  // 5
      -0.5, -0.5, 0.5,   // 6
      -0.5, -0.5, -0.5,  // 7
    ];

    const indices = [
      0, 2, 1,  //
      1, 2, 3,  //

      4, 5, 6,  //
      5, 7, 6,  //

      0, 4, 6,  //
      0, 6, 2,  //

      1, 7, 5,  //
      1, 3, 7,  //

      0, 1, 4,  //
      1, 5, 4,  //

      2, 6, 7,  //
      2, 7, 3,  //
    ];

    this.vertices = [];
    this.indices = [];

    for (let i = 0; i < 3; i++) {
      this.vertices.push(...vertices);
      this.indices = [...this.indices, ...indices.map(index => index + i * 8)]
    }

    this.normals = [
      1,  0,  0,   //
      1,  0,  0,   //
      1,  0,  0,   //
      1,  0,  0,   //
      -1, 0,  0,   //
      -1, 0,  0,   //
      -1, 0,  0,   //
      -1, 0,  0,   //
      0,  1,  0,   //
      0,  1,  0,   //
      0,  -1, 0,   //
      0,  -1, 0,   //
      0,  1,  0,   //
      0,  1,  0,   //
      0,  -1, 0,   //
      0,  -1, 0,   //
      0,  0,  1,   //
      0,  0,  -1,  //
      0,  0,  1,   //
      0,  0,  -1,  //
      0,  0,  1,   //
      0,  0,  -1,  //
      0,  0,  1,   //
      0,  0,  -1,  //
    ];

    // The defined indices (and corresponding vertices)
    // will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }
}
