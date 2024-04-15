import {CGFobject} from '../lib/CGF.js';

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices around the sphere
 * @param stacks - Number of stacks along the sphere
 * @param radius - Sphere radius
 * @param normals_direction - Direction of normals
 */
export class MySphere extends CGFobject {
  constructor(scene, slices, stacks, radius = 1, normals_direction = 1) {
    super(scene);

    this.slices = slices;
    this.stacks = stacks;
    this.radius = radius;
    this.normals_direction = normals_direction;

    this.initBuffers();
  }

  normal(x, y, z){
    // Normalizing the vector
    x /= this.radius;
    y /= this.radius;
    z /= this.radius;

    // Apply direction
    return [this.normals_direction*x, this.normals_direction*y, this.normals_direction*z];
  }

  push_index(a, b, c){
    if(this.normals_direction == 1){
      this.indices.push(a, b, c);
    } else {
      this.indices.push(a, c, b);
    }
  }


  initBuffers() {
    this.vertices = [
      0, this.radius, 0,  // Top vertex
      0, -this.radius, 0  // Bottom vertex
    ];
    this.normals = [
      ...this.normal(0, 1, 0),  // Top normal vertex
      ...this.normal(0, -1, 0),  // Bottom normal vertex
    ];
    this.indices = [];
    this.texCoords = [
      0, 0,
      1, 1
    ];

    const slice_angle_increment = 2 * Math.PI / this.slices;

    // Vertices and normals
    for (let i=0; i<this.stacks; i++){
      for(let j=0; j<this.slices+1; j++){
        const stack_angle = Math.PI/2 - Math.PI*i/this.stacks;
        const slice_angle = j*slice_angle_increment;

        const x = this.radius * Math.cos(stack_angle) * Math.sin(slice_angle);
        const y = this.radius * Math.sin(stack_angle);
        const z = this.radius * Math.cos(stack_angle) * Math.cos(slice_angle);

        this.vertices.push(x, y, z);
        this.normals.push(...this.normal(x, y, z));
        this.texCoords.push(j/this.slices, i/this.stacks);
      }
    }

    // Top Indices (Triangulation)
    for (let i=0; i<this.slices; i++){
      const current_vertex = i
      const next_vertex = (i+1)%this.slices;
      this.push_index(0, current_vertex, next_vertex);
    }
    
    // Middle Indices
    for (let i=0; i<this.stacks-1; i++) {
      for (let j=0; j<this.slices; j++) {
        const current_vertex = i * (this.slices + 1) + j + 2;
        const next_vertex = i * (this.slices + 1) + (j + 1) % (this.slices + 1) + 2;
    
        const next_stack_vertex = (i + 1) * (this.slices + 1) + j + 2;
        const next_stack_next_vertex = (i + 1) * (this.slices + 1) + (j + 1) % (this.slices + 1) + 2;
    
        this.push_index(current_vertex, next_stack_vertex, next_vertex);
        this.push_index(next_vertex, next_stack_vertex, next_stack_next_vertex);
      }
    }

    // Bottom Indices (Triangulation)
    for (let i=0; i<this.slices; i++) {
      const current_vertex = this.vertices.length / 3 - i - 1;
      const next_vertex = this.vertices.length / 3 - (i + 1) % this.slices - 1;
      this.push_index(1, current_vertex, next_vertex);
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
