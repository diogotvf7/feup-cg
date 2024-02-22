import {CGFobject} from '../lib/CGF.js';

import {MyDiamond} from './MyDiamond.js';
import {MyParallelogram} from './MyParallelogram.js';
import {MyTriangle} from './MyTriangle.js';
import {MyTriangleBig} from './MyTriangleBig.js';
import {MyTriangleSmall} from './MyTriangleSmall.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
  constructor(scene) {
    super(scene);
    this.diamond = new MyDiamond(this.scene);
    this.triangle = new MyTriangle(this.scene);
    this.triangleBig = new MyTriangleBig(this.scene);
    this.triangleSmall = new MyTriangleSmall(this.scene);
    this.parallelogram = new MyParallelogram(this.scene);
  }

  display() {
    this.scene.pushMatrix();
    this.scene.multMatrix([
      Math.cos(Math.PI / 4), Math.sin(Math.PI / 4), 0.0, 0.0,
      -Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), 0.0, 0.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 0.0, 1.0
    ]);
    this.diamond.display();
    this.scene.popMatrix();
    // =========================================================

    // ========================================== Small Triangle
    this.scene.pushMatrix();
    this.scene.translate(-1.4142, 0, 0);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1);
    this.triangleSmall.display();
    this.scene.popMatrix();
    // =========================================================

    // =========================================== Parallelogram
    this.scene.pushMatrix();
    this.scene.translate(-1.12, -0.29, 0);
    this.scene.scale(-1, 1, 1);
    this.parallelogram.display();
    this.scene.popMatrix();
    // =========================================================

    // ================================================ Triangle
    this.scene.pushMatrix();
    this.scene.translate(1.7, -0.29, 0);
    this.triangle.display();
    this.scene.popMatrix();
    // =========================================================

    // =============================================Triangle Big
    this.scene.pushMatrix();
    this.scene.translate(2.117, -0.707, 0);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1);
    this.triangleBig.display();
    this.scene.popMatrix();
    // =========================================================

    // =============================================Triangle Big
    this.scene.pushMatrix();
    this.scene.translate(4.945, -2.01, 0);
    this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
    this.triangleBig.display();
    this.scene.popMatrix();
    // =========================================================

    // ===========================================Triangle Small
    this.scene.pushMatrix();
    this.scene.translate(-3.82, 0.417, 0);
    this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
    this.triangleSmall.display();
    this.scene.popMatrix();
    // =========================================================
  }
}
