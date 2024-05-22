import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
  constructor(scene, base, height) {
    super(scene);
    this.base = base;
    this.height = height;

    this.initBuffers();
  }
  initBuffers() {
    this.vertices = [
        -this.base/2, 0, 0,
        this.base/2, 0, 0,
        0, this.height, 0,
    ];
    this.indices = [
        0, 1, 2,
        0, 2, 1,
    ];
    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
    ];
    this.texCoords = [
        0, 0,
        1, 0,
        0.5, 1,
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}