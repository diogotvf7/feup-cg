import {CGFobject} from '../lib/CGF.js';

// import {MyPrism} from './MyPrism.js';

/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene, slices, stacks);

    this.initBuffers();
  }
  initBuffers() {
    this.vertices = [
      0, 1, 0,  // Top vertex
      0, -1, 0  // Bottom vertex
    ];
    this.normals = [
      0, 1, 0,  // Top normal vertex
      0, -1, 0  // Bottom normal vertex
    ];
    this.indices = [];

    const slice_angle_increment = 2 * Math.PI / this.slices;

    // Vertices and normals
    for (let i=0; i<this.slacks; i++){
      for(let j=0; j<this.slices; j++){
        const stack_angle = Math.PI/2 - Math.PI*i/this.stacks;
        const slice_angle = j*slice_angle_increment;

        const x = Math.cos(stack_angle) * Math.sin(slice_angle);
        const y = Math.sin(slice_angle);
        const z = Math.cos(stack_angle) * Math.cos(slice_angle);

        this.vertices.push(x, y, z);
        this.normals.push(x, y, z);
      }
    }
    // Top Indices (Triangulation)
    const north_pole_vertexs = this.vertices.slice(1, this.slices+1)
    for (let i=0; i<north_pole_vertexs.length; i++){
      const current_vertex = north_pole_vertexs[i];
      const next_vertex = north_pole_vertexs[(i+1)%north_pole_vertexs.length];
      this.indices.push(0, current_vertex, next_vertex);
    }
    
    // Middle Indices
    // TODO: Review the indexes
    for (let i=0; i<this.stacks; i++){
      for (let j=0; j<this.slices; j++){
        const current_vertex = i*this.slices + j + 1;
        const next_vertex = i*this.slices + (j+1)%this.slices + 1;
        const next_stack_vertex = (i+1)*this.slices + j + 1;
        const next_stack_next_vertex = (i+1)*this.slices + (j+1)%this.slices + 1;

        this.indices.push(current_vertex, next_vertex, next_stack_vertex);
        this.indices.push(next_vertex, next_stack_vertex, next_stack_next_vertex);
      }
    }

    // Bottom Indices (Triangulation)
    const south_pole_vertexs = this.vertices.slice(-this.slices);
    for (let i=0; i<south_pole_vertexs.length; i++){
      const current_vertex = south_pole_vertexs[i];
      const next_vertex = south_pole_vertexs[(i+1)%south_pole_vertexs.length];
      this.indices.push(1, current_vertex, next_vertex);
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
