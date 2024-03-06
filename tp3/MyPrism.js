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
  getNormal(point1, point2) {
    const sideVector = [point2[0] - point1[0], point2[1] - point1[1]];
    const normalVector = [-sideVector[1], sideVector[0]];
    
    const length = Math.sqrt(normalVector[0]**2 + normalVector[1]**2)

    return [normalVector[0] / length, normalVector[1] / length]
  }
  printVertices(vertices) {
    let str = "";
    for (let i = 0; i < vertices.length / 3; i++) {
      str += '[' + vertices[i*3] + ', ' + vertices[i*3] + ', ' + vertices[i*3] + ']\n';
    }
    console.log(str);
  }
  initBuffers() {
    this.vertices = [
      0, 0, 0,  //
      0, 0, this.stacks
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

    for (let i = 0; i < this.slices; i++) {
      const x = Math.cos(i * angle);
      const y = Math.sin(i * angle);

      const next_x = Math.cos((i + 1) * angle);
      const next_y = Math.sin((i + 1) * angle);
      
      const normalVector = this.getNormal([next_x, next_y], [x, y]);



      const firstMfPointIndex = this.vertices.length / 3;
      for (let z = 0; z < this.stacks + 1; z++) {
        const currentVerticeIndex = this.vertices.length / 3; 
        
        this.vertices.push(x, y, z);
        this.vertices.push(next_x, next_y, z);
        
        this.normals.push(normalVector[0], normalVector[1], 0)
        this.normals.push(normalVector[0], normalVector[1], 0)

        // this.indices.push(currentVerticeIndex, currentVerticeIndex + 1, currentVerticeIndex + this.stacks*2)

        // if (i + 1 == this.slices)
        //   //this.indices.push(currentVerticeIndex + 1, firstMfPointIndex, firstMfPointIndex+1)
        //   this.indices.push(currentVerticeIndex, firstMfPointIndex, firstMfPointIndex+1)
        //   // please, now make it work
        //   //this.indices.push(currentVerticeIndex - 1, firstMfPointIndex, firstMfPointIndex+1)
        //   //this.indices.push(firstMfPointIndex, firstMfPointIndex+1, currentVerticeIndex)
        // else 
        //   this.indices.push(currentVerticeIndex + this.stacks * 2, currentVerticeIndex + 1, currentVerticeIndex)
        }
    }

    // Generate the last base
    const nVertices = this.vertices.length / 3 + this.slices;
    for (let i = 0; i < this.slices; i++) {
      const x = Math.cos(i * angle);
      const y = Math.sin(i * angle);

      this.vertices.push(x, y, this.stacks);
      this.normals.push(0, 0, 1);
      this.indices.push(nVertices - (i + 1), 1, nVertices - ((i + 1) % this.slices + 1));
      this.indices.push(nVertices - (i + 1), 1, nVertices - ((i + 1) % this.slices + 1));
      
      this.indices.push(nVertices - (i + 1), i + 2, (i+1) % this.stacks + 2);
      // this.indices.push(i, nVertices - (i), nVertices - ((i + 1) % this.slices));
    }

    // Indexes for the sides and all th stacks
  //  for (let i = 0; i < this.stacks; i++) {
  //    let stackIncrement = i * (this.slices + 1) + 2;
  //    for (let j = 0; j < this.slices; j++) {
  //        let index = stackIncrement + j + this.slices + 2;
  //        this.indices.push(stackIncrement + j, stackIncrement + j + 1, index);
  //        this.indices.push(stackIncrement + j + this.slices + 1, stackIncrement + j, index);
  //    }
  //}

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
