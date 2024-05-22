import {CGFobject} from '../lib/CGF.js';
import { deCasteljau, getDir, rad_to_deg } from './utils.js';

/**
 * MyBezierCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBezierCylinder extends CGFobject {
  constructor(scene, radius, axis, radius_coefficient, slices = 20, stacks = 20) {
    super(scene);
    this.radius = radius;
    this.axis = axis;
    this.radius_coefficient = radius_coefficient.length > 0 
      ? radius_coefficient
      : [[1, 1], [1, 1], [1, 1], [1, 1]];
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
  }
  
  initBuffers() { 
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    const angle = 2 * Math.PI / this.slices;
    let path;
    for (let i = 0; i <= this.stacks; i += 1) {
      path = deCasteljau(this.axis, i / this.stacks);
      const center = path.point;
      const normal = path.normal;
      const normal_angle = Math.atan2(normal[0], normal[1]);      
      if (i == 0) {
        this.vertices.push(center[0], center[1], 0);
        this.normals.push(-path.normal[0], -path.normal[1], 0);
        this.texCoords.push(0, 0);
      }

      const radius = this.radius * deCasteljau(this.radius_coefficient, i / this.stacks).point[0];
      const offset = i * this.slices + 1;

      for (let j = 0; j < this.slices; j++) {
        const x = center[0] + radius * Math.cos(j * angle) * Math.cos(normal_angle);
        const y = center[1] + radius * Math.cos(j * angle) * -Math.sin(normal_angle);
        const z = 0         + radius * Math.sin(j * angle);

        this.vertices.push(x, y, z);
        this.normals.push(...getDir([center[0], center[1], 0], [x, y, z]));
        this.texCoords.push(j / (this.slices - 1), i / this.stacks);

        if (i < this.stacks) {
          this.indices.push(offset + j + this.slices, offset + (j + 1) % this.slices, offset + j);
          this.indices.push(offset + this.slices + (j + 1) % this.slices, offset + (j + 1) % this.slices, offset + j + this.slices);
        } 
        if (i == this.stacks) {
          this.indices.push(offset + (j + 1) % this.slices, offset + j, offset + this.slices - 1);
        } 
        if (i == 0) {
          this.indices.push(0, j + 1, j + 2);
        }
      }      
    }

    this.vertices.push(...path.point, 0);
    this.normals.push(-path.normal[0], path.normal[1], 0);
    this.texCoords.push(.5, 1);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
    // this.enableNormalViz();
  }
}