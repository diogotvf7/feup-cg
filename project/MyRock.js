import { CGFtexture, CGFappearance } from '../lib/CGF.js';
import { Object } from './Object.js';

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices around the sphere
 * @param stacks - Number of stacks along the sphere
 * @param radius - Sphere radius
 * @param scaleX - Scale factor on the x-axis
 * @param scaleY - Scale factor on the y-axis
 * @param scaleZ - Scale factor on the z-axis
 */
export class MyRock extends Object {
  constructor(scene, position, slices, stacks, radius = 1, scaleX = 1, scaleY = 1, scaleZ = 1) {
    super(scene, position);

    this.scene = scene;

    this.slices = slices;
    this.stacks = stacks;
    this.radius = radius;
    this.normals_direction = 1;

    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.scaleZ = scaleZ;

    this.texture = new CGFtexture(scene, 'images/textures/lichen/lichen_diff.jpg');
    this.appearance = new CGFappearance(scene);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance.setEmission(0.6, 0.6, 0.6, 1);

    this.initBuffers();
  }

  normal(x, y, z) {
    // Normalizing the vector
    x /= this.radius;
    y /= this.radius;
    z /= this.radius;

    // Apply direction
    return [this.normals_direction * x, this.normals_direction * y, this.normals_direction * z];
  }

  push_index(a, b, c) {
    if (this.normals_direction == 1) {
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
    for (let i = 0; i < this.stacks; i++) {
      for (let j = 0; j <= this.slices; j++) {
        const stack_angle = Math.PI / 2 - Math.PI * i / this.stacks;
        const slice_angle = j * slice_angle_increment;

        const h = 0.8 + Math.random() * 0.2;

        const x = h * this.radius * Math.cos(stack_angle) * Math.sin(slice_angle);
        const y = h * this.radius * Math.sin(stack_angle);
        const z = h * this.radius * Math.cos(stack_angle) * Math.cos(slice_angle);

        this.vertices.push(x, y, z);
        this.normals.push(...this.normal(x, y, z));
        this.texCoords.push(j / this.slices, i / this.stacks);
      }
    }

    // Top Indices (Triangulation)
    for (let i = 0; i < this.slices; i++) {
      const current_vertex = i
      const next_vertex = (i + 1) % this.slices;
      this.push_index(0, current_vertex, next_vertex);
    }

    // Middle Indices
    for (let i = 0; i < this.stacks - 1; i++) {
      for (let j = 0; j <= this.slices; j++) {
        const current_vertex = i * (this.slices + 1) + j + 2;
        const next_vertex = i * (this.slices + 1) + (j + 1) % (this.slices + 1) + 2;

        const next_stack_vertex = (i + 1) * (this.slices + 1) + j + 2;
        const next_stack_next_vertex = (i + 1) * (this.slices + 1) + (j + 1) % (this.slices + 1) + 2;

        this.push_index(current_vertex, next_stack_vertex, next_vertex);
        this.push_index(next_vertex, next_stack_vertex, next_stack_next_vertex);
      }
    }

    // Bottom Indices (Triangulation)
    for (let i = 0; i < this.slices; i++) {
      const current_vertex = this.vertices.length / 3 - i - 1;
      const next_vertex = this.vertices.length / 3 - (i + 1) % this.slices - 1;
      this.push_index(1, current_vertex, next_vertex);
    }

    // The defined indices (and corresponding vertices)
    // will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  display(){
    this.scene.pushMatrix();
    this.appearance.apply();
    this.scene.scale(this.scaleX, this.scaleY, this.scaleZ);
    super.display();
    this.scene.popMatrix();
  }
}
