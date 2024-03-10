import {MyPrism} from './MyPrism.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends MyPrism {
  constructor(scene, slices, stacks) {
    super(scene, slices, stacks);

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
    for (let i = 0; i < this.slices; i++) {
      const x = Math.cos(i * angle);
      const y = Math.sin(i * angle);

      const vector = [x, y];
      const length = Math.sqrt(vector[0] ** 2 + vector[1] ** 2)
      const normalVector = [vector[0] / length, vector[1] / length]

          for (let z = 0; z < this.stacks + 1; z++) {
        this.vertices.push(x, y, z / this.stacks);
        this.normals.push(normalVector[0], normalVector[1], 0);
      }
    }

    // Generate the top
    const nVertices = this.vertices.length / 3;
    for (let i = 0, iOffset = nVertices; i < this.slices; i++, iOffset++) {
      const x = Math.cos(i * angle);
      const y = Math.sin(i * angle);

      this.vertices.push(x, y, 1);
      this.normals.push(0, 0, 1);

      this.indices.push(
          (i + 1) % this.slices + nVertices,  //
          1,                                  //
          iOffset,                            //
      );
      this.indices.push(
          (i + 1) % this.slices + nVertices,  //
          iOffset,                            //
          i + 2,
      );
      this.indices.push(
          i + 2,                              //
          (i + 1) % this.slices + 2,          //
          (i + 1) % this.slices + nVertices,  //
      );
    }

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
