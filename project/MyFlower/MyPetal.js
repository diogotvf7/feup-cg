import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import {arraySub, normalizeVector, scaleVector} from '../utils.js';

// import {MySphere} from './MySphere.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the stem cylinders
 * @param height - Height of the stem
 * @param colour - Colour of the stem
 * @param complexity - Complexity of the cylinders that make up the stem
 */
export class MyPetal extends CGFobject {
  constructor(scene, width, height, curvature, depth) {
    super(scene);
    // this.scene = scene;
    this.width = width;
    this.height = height;
    this.curvature = curvature;
    this.depth = depth;

    // this.apperance = new CGFappearance(scene);
    // this.apperance.setTexture(this.texture);
    // this.apperance.setTextureWrap('REPEAT', 'REPEAT');
    // this.apperance.setEmission(1, 1, 1, 1);

    // this.apperance.setAmbient(0, 0, 0, 0);
    // this.apperance.setDiffuse(0, 0, 0, 0);
    // this.apperance.setSpecular(0, 0, 0, 0);
    // this.apperance.setShininess(0);
    this.initBuffers();
  }
  initBuffers() {
    const topX = this.width / Math.tan(this.curvature) / 2;

    this.vertices = [
      0, this.height / 2, -this.depth,  // 0 Back
      //
      0, 0, 0,                              // 1 Bottom
      this.width / 2, this.height / 2, 0,   // 2 Mid right
      topX, this.height, 0,                 // 3 Top
      -this.width / 2, this.height / 2, 0,  // 4 Mid left
      //
      0, 0, 0,                              // 5 Bottom
      this.width / 2, this.height / 2, 0,   // 6 Mid right
      topX, this.height, 0,                 // 7 Top
      -this.width / 2, this.height / 2, 0,  // 8 Mid left
      //
      0, 0, 0,                              // 1 Bottom
      this.width / 2, this.height / 2, 0,   // 2 Mid right
      topX, this.height, 0,                 // 3 Top
      -this.width / 2, this.height / 2, 0,  // 4 Mid left
      //
      0, 0, 0,                              // 5 Bottom
      this.width / 2, this.height / 2, 0,   // 6 Mid right
      topX, this.height, 0,                 // 7 Top
      -this.width / 2, this.height / 2, 0,  // 8 Mid left
      //
      0, this.height / 2, -this.depth,  // 9 Back
      0, this.height / 2, -this.depth,  // 10 Back
      0, this.height / 2, -this.depth,  // 11 Back
      0, this.height / 2, -this.depth,  // 12 Back
      0, this.height / 2, -this.depth,  // 13 Back
      0, this.height / 2, -this.depth,  // 14 Back
      0, this.height / 2, -this.depth,  // 15 Back
    ];

    this.indices = [
      // Front
      0, 1, 2,  // Bot right
      0, 2, 3,  // Top right
      0, 3, 4,  // Top left
      0, 4, 1,  // Bot left
      // Back
      0, 2, 1,  // Bot right
      0, 3, 2,  // Top right
      0, 4, 3,  // Top left
      0, 1, 4,  // Bot left
    ];

    const normals = [];
    for (let i = 0; i < 4; i++) {
      const AB = arraySub(
          this.vertices.slice(
              this.indices[i * 3] * 3, this.indices[i * 3] * 3 + 3),
          this.vertices.slice(
              this.indices[i * 3 + 1] * 3, this.indices[i * 3 + 1] * 3 + 3));
      const BC = arraySub(
          this.vertices.slice(
              this.indices[i * 3 + 2] * 3, this.indices[i * 3 + 2] * 3 + 3),
          this.vertices.slice(
              this.indices[i * 3] * 3, this.indices[i * 3] * 3 + 3));
      normals.push(normalizeVector([
        AB[1] * BC[2] - AB[2] * BC[1],
        AB[2] * BC[0] - AB[0] * BC[2],
        AB[0] * BC[1] - AB[1] * BC[0],
      ]));
    }

    this.normals = [
      ...scaleVector(normals[0], -1),  // 0 Back
      ...scaleVector(normals[0], -1),  // 1 Bottom
      ...scaleVector(normals[1], -1),  // 2 Mid right
      ...scaleVector(normals[2], -1),  // 3 Top
      ...scaleVector(normals[3], -1),  // 4 Mid left
      ...scaleVector(normals[3], -1),  // 5 Bottom
      ...scaleVector(normals[0], -1),  // 6 Mid right
      ...scaleVector(normals[1], -1),  // 7 Top
      ...scaleVector(normals[2], -1),  // 8 Mid left
      ...normals[0],                   // 1 Bottom
      ...normals[1],                   // 2 Mid right
      ...normals[2],                   // 3 Top
      ...normals[3],                   // 4 Mid left
      ...normals[3],                   // 5 Bottom
      ...normals[0],                   // 6 Mid right
      ...normals[1],                   // 7 Top
      ...normals[2],                   // 8 Mid left
      ...scaleVector(normals[1], -1),  // 0 Back
      ...scaleVector(normals[2], -1),  // 0 Back
      ...scaleVector(normals[3], -1),  // 0 Back
      ...normals[0],                   // 0 Back
      ...normals[1],                   // 0 Back
      ...normals[2],                   // 0 Back
      ...normals[3],                   // 0 Back
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
    this.initNormalVizBuffers();
    // this.enableNormalViz();
  }
}
