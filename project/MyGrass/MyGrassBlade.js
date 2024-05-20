import { Object } from '../Object.js';

export class MyGrassBlade extends Object {
  constructor(scene, position) {
    super(scene, position);

    this.width = 0.2 + Math.random() * 0.2;
    this.height = 0.6 + Math.random() * 2;

    this.rotation = Math.random() * Math.PI;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];

    this.vertices.push(
      -this.width / 2,0, 0,
      this.width / 2,0, 0,
      -this.width / 4, this.height / 2, 0,
      this.width / 4, this.height / 2, 0,
      0, this.height, 0,
    );

    this.indices.push(
      // Front
      0, 1, 2,
      1, 3, 2,
      2, 3, 4,

      // Back
      2, 1, 0,
      2, 3, 1,
      4, 3, 2,
    );

    this.texCoords = [
      0, 0,
      1, 0,
      0.25, 0.5,
      0.75, 0.5,
      1, 1
    ];
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  display() {
    this.scene.pushMatrix();

    this.scene.rotate(this.rotation, 0, 1, 0);
    super.display();

    this.scene.popMatrix();
  }
}
