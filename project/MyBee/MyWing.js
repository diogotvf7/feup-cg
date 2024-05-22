import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyBezierCylinder } from '../MyBezierCylinder.js';
import { deCasteljau, dist } from '../utils.js';

/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWing extends CGFobject {
  constructor(scene) {
    super(scene);    
    this.bezier = [
      [0,     0],
      [0,     .09],
      [1,     .47],
      [.885,  .32],
      [.67,   0],
      [.45,   0],
      [.45,   -.146],
      [0,     -.146],
      [0,     -.069],
      [0,     0],
    ];
    this.steps = 100;

    this.initBuffers();
  }
  initBuffers() {
    this.vertices = [
      0.4, 0, 0.1,
    ];
    this.normals = [];
    this.indices = [];
    this.texCoords = [
      0.4, 0.1,
    ];

    for (let i = 0; i <= this.steps; i++) {
      const bezier = deCasteljau(this.bezier, i / (this.steps - 1));

      const point = [bezier.point[0], 0, bezier.point[1]];

      this.vertices.push(...point);
      this.vertices.push(...point);
      this.normals.push(0, 1, 0);
      this.normals.push(0, -1, 0);
      this.texCoords.push(point[0], point[2]);
      this.texCoords.push(point[0], point[2]);
      this.indices.push(0, i * 2, (i * 2 + 2) % (this.steps * 2 + 2));
      this.indices.push(0, (i * 2 + 2) % (this.steps * 2 + 2), i * 2);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
