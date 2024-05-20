import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import {generateArrayWithSum, getDir} from '../utils.js';

/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the stem cylinders
 * @param size - size of the stem
 * @param colour - Colour of the stem
 * @param complexity - Complexity of the cylinders that make up the stem
 */
export class MyStem extends CGFobject {
  constructor(scene, radius, size, complexity) {
    super(scene);
    // this.scene = scene;
    this.radius = radius;
    this.size = size;

    this.complexity = complexity;
    this.leafStart = [];

    this.initBuffers();
  }
  selectRandomHeightsForLeaf(heights, maxHeight) {
    let selectedHeights = [];
    let height = 0;
    for (let i = 0; i < heights.length; i++) {
      height += heights[i];
      if (height >= maxHeight * 0.2 && height <= 0.8 * maxHeight)
        if (Math.random() < 0.6) selectedHeights.push(i);
    }
    return selectedHeights;
  }
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    const angle = 2 * Math.PI / this.complexity;

    const sizes = generateArrayWithSum(5, this.size);
    const leafsHeights = this.selectRandomHeightsForLeaf(sizes, this.size);
    this.leafs = [];

    let baseCenter = [0, 0, 0];
    for (let h = 0; h < sizes.length; h++) {
      const offsetRadius = Math.random() * sizes[h] / 2;
      const offsetAngle = Math.random() * 2 * Math.PI;

      const topCenter = [
        baseCenter[0] + Math.cos(offsetAngle) * offsetRadius,  //
        baseCenter[1] + sizes[h],                              //
        baseCenter[2] + Math.sin(offsetAngle) * offsetRadius   //
      ];

      for (let j = 0; j < this.complexity; j++) {
        const x = Math.cos(j * angle) * this.radius;
        const z = Math.sin(j * angle) * this.radius;
        const length = Math.sqrt(x ** 2 + z ** 2);
        const normal = [x / length, 0, z / length];

        this.vertices.push(
            baseCenter[0] + x,  // Base x
            baseCenter[1],      // Base y
            baseCenter[2] + z,  // Base z
            topCenter[0] + x,   // Top x
            topCenter[1],       // Top y
            topCenter[2] + z,   // Top z
        );

        this.texCoords.push(
            j / this.complexity,
            0,  // Base
            j / this.complexity,
            1,  // Top
        );

        this.normals.push(
            ...normal,
            ...normal,
        );
        this.indices.push(
            ((j * 2 + 2) % (this.complexity * 2)) +
                h * this.complexity * 2,            // Bot triangle
            (j * 2) + h * this.complexity * 2,      //
            (j * 2 + 1) + h * this.complexity * 2,  //
            ((j * 2 + 3) % (this.complexity * 2)) +
                h * this.complexity * 2,  // Top triangle
            ((j * 2 + 2) % (this.complexity * 2)) + h * this.complexity * 2,  //
            (j * 2 + 1) + h * this.complexity * 2,                            //
        );
      }

      if (leafsHeights.includes(h)) {
        this.leafs.push([
          topCenter[0],  //
          topCenter[1],  //
          topCenter[2],  //
        ]);
      }

      if (h == sizes.length - 1) this.secondTopCenter = baseCenter;
      baseCenter = topCenter;
    }

    this.topCenter = baseCenter;

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
    this.initNormalVizBuffers();
  }
}
