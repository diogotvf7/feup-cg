import {CGFobject} from '../lib/CGF.js';

import {MyQuad} from './MyQuad.js';

/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
  constructor(scene) {
    super(scene);
    this.quad = new MyQuad(scene);
  }

  display() {
    // ========================================= Front
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1);
    this.quad.display();
    this.scene.popMatrix();
    // ===============================================

    // ========================================== Back
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();
    // ===============================================

    // =========================================== Top
    this.scene.pushMatrix();
    this.scene.translate(0, 1, 0);
    this.scene.rotate(Math.PI / 2, -1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();
    // ===============================================

    // =========================================== Bot
    this.scene.pushMatrix();
    this.scene.translate(0, -1, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();
    // ===============================================

    // ====================================== LeftSide
    this.scene.pushMatrix();
    this.scene.translate(1, 0, 0);  // x, y, z
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();
    // ===============================================


    // ===================================== RightSide
    this.scene.pushMatrix();
    this.scene.translate(-1, 0, 0);  // x, y, z
    this.scene.rotate(Math.PI / 2, 0, -1, 0);
    this.quad.display();
    this.scene.popMatrix();
    // ===============================================
  }
}
