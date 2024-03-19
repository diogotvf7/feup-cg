import {CGFappearance, CGFobject} from '../lib/CGF.js';

import {MyQuad} from './MyQuad.js';

/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
  constructor(scene, top, front, right, back, left, bottom) {
    super(scene);
    this.quad = new MyQuad(scene);
    this.top = this.createMaterial(scene, top);
    this.front = this.createMaterial(scene, front);
    this.right = this.createMaterial(scene, right);
    this.back = this.createMaterial(scene, back);
    this.left = this.createMaterial(scene, left);
    this.bottom = this.createMaterial(scene, bottom);
  }

  createMaterial(scene, texture) {
    const material = new CGFappearance(scene);
    material.setAmbient(0.1, 0.1, 0.1, 1);
    material.setDiffuse(0.9, 0.9, 0.9, 1);
    material.setSpecular(0.1, 0.1, 0.1, 1);
    material.setShininess(10.0);
    material.loadTexture(texture);
    return material;
  }


  display() {
    // =========================================== Top
    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(Math.PI / 2, -1, 0, 0);
    this.top.apply();

    this.scene.gl.texParameteri(
        this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER,
        this.scene.gl.NEAREST);
    this.updateTexCoordsGLBuffers();
    this.quad.display();
    this.scene.popMatrix();
    // ===============================================

    // ========================================= Front
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.front.apply();
    this.scene.gl.texParameteri(
        this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER,
        this.scene.gl.NEAREST);
    this.updateTexCoordsGLBuffers();
    this.quad.display();
    this.scene.popMatrix();
    // ===============================================

    // ===================================== RightSide
    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0, 0);  // x, y, z
    this.scene.rotate(Math.PI / 2, 0, -1, 0);
    this.right.apply();
    this.scene.gl.texParameteri(
        this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER,
        this.scene.gl.NEAREST);
    this.updateTexCoordsGLBuffers();
    this.quad.display();
    this.scene.popMatrix();
    // ===============================================

    // ========================================== Back
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.back.apply();
    this.scene.gl.texParameteri(
        this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER,
        this.scene.gl.NEAREST);
    this.updateTexCoordsGLBuffers();
    this.quad.display();
    this.scene.popMatrix();
    // ===============================================

    // ====================================== LeftSide
    this.scene.pushMatrix();
    this.scene.translate(0.5, 0, 0);  // x, y, z
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.left.apply();
    this.scene.gl.texParameteri(
        this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER,
        this.scene.gl.NEAREST);
    this.updateTexCoordsGLBuffers();
    this.quad.display();
    this.scene.popMatrix();
    // ===============================================

    // =========================================== Bot
    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.bottom.apply();
    this.scene.gl.texParameteri(
        this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER,
        this.scene.gl.NEAREST);
    this.updateTexCoordsGLBuffers();
    this.quad.display();
    this.scene.popMatrix();
    // ===============================================
  }
}
