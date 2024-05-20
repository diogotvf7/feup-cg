import {CGFobject} from '../lib/CGF.js';
import { deCasteljau, getDir } from './utils.js';

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
  constructor(scene, radius, height, axis) {
    super(scene);
    this.radius = radius;
    this.height = height;
    this.axis = axis;
    this.slices = 16;
    this.stacks = 20;
    this.initBuffers();
  }
  
  initBuffers() {
    this.vertices = [];
    this.indices = [0, 1, 2];
    this.normals = [];
 
    const angle = 2 * Math.PI / this.slices;
    for (let i = 0; i < this.stacks; i += 1) {
      const bezier_info = deCasteljau(this.axis, i / this.stacks);
      const center = bezier_info.point;
      const normal = bezier_info.normal;
      const normal_angle = Math.atan2(normal[1], normal[0]);

      console.log('center: ', center);  
      console.log('normal: ', normal);  
      console.log('normal_angle: ', normal_angle);  

      for (let j = 0; j < this.slices; j++) {
        const x = 0 + this.radius * Math.sin(normal_angle) + Math.cos(j * angle) * this.radius;
        const y = center[1] * this.radius + this.radius * Math.sin(normal_angle);
        const z = center[0] * this.radius + this.radius * Math.cos(normal_angle) + Math.sin(j * angle) * this.radius;

        console.log("x: ", x, "      y: ", y, "      z: ", z);

        this.vertices.push(x, y, z);
        this.normals.push(...getDir(center, [x, y, z]));
      }
    }

    console.log('vertices: ', this.vertices);

    this.enableNormalViz();
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}

// import {CGFobject} from '../lib/CGF.js';
// import { deCasteljau } from './utils.js';

// /**
//  * MyCylinder
//  * @constructor
//  * @param scene - Reference to MyScene object
//  */
// export class MyCylinder extends CGFobject {
//   constructor(scene, radius, height, axis, bezier_points) {
//     super(scene);
//     this.radius = radius;
//     this.height = height;
//     this.axis = axis;
//     this.bezier_points = bezier_points;
//     this.slices = 16;
//     this.stacks = 20;
//     this.initBuffers();
//   }
  
//   initBuffers() {
//     this.vertices = [];
//     this.indices = [];
//     this.normals = [];

//     const angle = 2 * Math.PI / this.slices;
//     const stackHeight = this.height / this.stacks;

//     // Calculate points along the bezier curve for the center axis
//     const bezier_curve_points = [];
//     for (let t = 0; t <= 1; t += 1 / this.stacks) {
//       bezier_curve_points.push(deCasteljau(this.axis, t));
//     }

//     // Generate vertices and normals for each stack
//     for (let i = 0; i < this.stacks; i++) {
//       const bezier_point = bezier_curve_points[i];
//       const next_bezier_point = bezier_curve_points[Math.min(i + 1, this.stacks - 1)];

//       for (let j = 0; j < this.slices; j++) {
//         const x0 = Math.cos(j * angle) * this.radius;
//         const z0 = Math.sin(j * angle) * this.radius;
//         const x1 = Math.cos((j + 1) * angle) * this.radius;
//         const z1 = Math.sin((j + 1) * angle) * this.radius;

//         // Calculate vertex positions along the cylinder
//         const vertex0 = [
//           bezier_point[0] + x0,
//           stackHeight * i,
//           bezier_point[1] + z0
//         ];
//         const vertex1 = [
//           next_bezier_point[0] + x0,
//           stackHeight * (i + 1),
//           next_bezier_point[1] + z0
//         ];
//         const vertex2 = [
//           bezier_point[0] + x1,
//           stackHeight * i,
//           bezier_point[1] + z1
//         ];
//         const vertex3 = [
//           next_bezier_point[0] + x1,
//           stackHeight * (i + 1),
//           next_bezier_point[1] + z1
//         ];

//         // Calculate normals
//         const normal0 = [x0, 0, z0];
//         const normal1 = [x1, 0, z1];

//         // Push vertices and normals to arrays
//         this.vertices.push(...vertex0);
//         this.vertices.push(...vertex1);
//         this.vertices.push(...vertex2);
//         this.vertices.push(...vertex3);

//         this.normals.push(...normal0);
//         this.normals.push(...normal1);
//         this.normals.push(...normal0);
//         this.normals.push(...normal1);

//         // Calculate indices
//         const offset = i * this.slices * 2;
//         this.indices.push(
//           offset + j * 2,
//           offset + j * 2 + 1,
//           offset + (j * 2 + 2) % (this.slices * 2),
//           offset + j * 2 + 1,
//           offset + (j * 2 + 3) % (this.slices * 2),
//           offset + (j * 2 + 2) % (this.slices * 2)
//         );
//       }
//     }

//     this.primitiveType = this.scene.gl.TRIANGLES;
//     this.initGLBuffers();
//   }
// }
