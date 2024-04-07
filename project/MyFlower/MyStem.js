import {CGFappearance, CGFobject} from '../../lib/CGF.js';

// import {MySphere} from './MySphere.js';

/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the stem cylinders
 * @param height - Height of the stem
 * @param colour - Colour of the stem
 * @param complexity - Complexity of the cylinders that make up the stem
 */
export class MyStem extends CGFobject {
  constructor(scene, radius, height, complexity, colour) {
    super(scene, radius, height, complexity, colour);
    // this.scene = scene;
    this.radius = radius;
    this.height = height;
    this.colour = colour;
    this.complexity = complexity;


    // this.apperance = new CGFappearance(scene);
    // this.apperance.setTexture(this.texture);
    // this.apperance.setTextureWrap('REPEAT', 'REPEAT');
    // this.apperance.setEmission(1, 1, 1, 1);

    // this.apperance.setAmbient(0, 0, 0, 0);
    // this.apperance.setDiffuse(0, 0, 0, 0);
    // this.apperance.setSpecular(0, 0, 0, 0);
    // this.apperance.setShininess(0);
    this.initBuffers();
  }
  generateArrayWithSum(n, sum) {
    if (n === 0) return [];
    const quotient = Math.floor(sum / n);
    const remainder = sum % n;

    const result = [];
    let currentSum = 0;
    for (let i = 0; i < n; i++) {
      let value;
      if (i < remainder) {
        // If there are still remaining elements, add a random value within the
        // range [quotient, quotient + 1)
        value = quotient + Math.random() * 2;
      } else {
        // Otherwise, add a random value within the range [quotient, quotient -
        // 1)
        value = quotient + Math.random() * 2 - 1;
      }
      result.push(value);
      currentSum += value;
    }

    const sumDifference = sum - currentSum;
    if (sumDifference !== 0) result[n - 1] += sumDifference;


    return result;
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    const angle = 2 * Math.PI / this.complexity;

    // const heights = [];
    // let sum = 0;
    // while (sum < this.height) {
    //   let height = +((Math.random() * (this.height - sum)).toFixed(1));
    //   heights.push(height);
    //   sum += height;
    // }
    const heights = this.generateArrayWithSum(5, this.height);
    console.log('heights: ', heights);

    let baseCenter = [0, 0, 0];
    for (let h = 0; h < heights.length; h++) {
      const offsetRadius = Math.random() * heights[h] / 2;
      const offsetAngle = Math.random() * 2 * Math.PI;

      const topCenter = [
        baseCenter[0] + Math.cos(offsetAngle) * offsetRadius,  //
        baseCenter[1] + heights[h],                            //
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

      baseCenter = topCenter;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
    this.initNormalVizBuffers();
  }

  //   initBuffers() {
  //     this.vertices = [];
  //     this.indices = [];
  //     this.normals = [];

  //     const heights = [];
  //     let sum = 0;
  //     while (sum < this.height) {
  //       let height = Math.floor(Math.random() * height);
  //       heights.push(height);
  //       sum += height;
  //     }

  //     let nextCenter = [0, 0, 0];
  //     for (const height of heights) {
  //       nextCenter = this.buildCylinder(nextCenter, height);
  //     }
  //   }
}
