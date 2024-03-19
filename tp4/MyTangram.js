import {CGFappearance, CGFobject} from '../lib/CGF.js';

import {MyDiamond} from './shapes/MyDiamond.js';
import {MyParallelogram} from './shapes/MyParallelogram.js';
import {MyTriangle} from './shapes/MyTriangle.js';
import {MyTriangleBig} from './shapes/MyTriangleBig.js';
import {MyTriangleSmall} from './shapes/MyTriangleSmall.js';

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

    const colors =
        ['purple', 'yellow', 'red', 'green', 'pink', 'blue', 'orange'];
    this.colors = {};
    colors.forEach(
        (
            color,
            ) => {
          this.colors[color] = new CGFappearance(this.scene);
        });
    // Purple: #AB4EC3
    this.colors.purple.setAmbient(0.67, 0.3, 0.67, 1);
    this.colors.purple.setDiffuse(0.67, 0.3, 0.67, 1);
    this.colors.purple.setSpecular(0.67, 0.3, 0.67, 1);
    // Yellow: #FFFF00
    this.colors.yellow.setAmbient(1, 1, 0, 1);
    this.colors.yellow.setDiffuse(1, 1, 0, 1);
    this.colors.yellow.setSpecular(1, 1, 0, 1);
    // Red: #FF0C0A
    this.colors.red.setAmbient(1, 0.05, 0.04, 1);
    this.colors.red.setDiffuse(1, 0.05, 0.04, 1);
    this.colors.red.setSpecular(1, 0.05, 0.04, 1);
    // Green: #03FF00
    this.colors.green.setAmbient(0.01, 1, 0, 1);
    this.colors.green.setDiffuse(0.01, 1, 0, 1);
    this.colors.green.setSpecular(0.01, 1, 0, 1);
    // Pink: #FF9ED3
    this.colors.pink.setAmbient(1, 0.62, 0.83, 1);
    this.colors.pink.setDiffuse(1, 0.62, 0.83, 1);
    this.colors.pink.setSpecular(1, 0.62, 0.83, 1);
    // Blue: #009DFF
    this.colors.blue.setAmbient(0, 0.62, 1, 1);
    this.colors.blue.setDiffuse(0, 0.62, 1, 1);
    this.colors.blue.setSpecular(0, 0.62, 1, 1);
    // Orange: #FF9E00
    this.colors.orange.setAmbient(1, 0.62, 0, 1);
    this.colors.orange.setDiffuse(1, 0.62, 0, 1);
    this.colors.orange.setSpecular(1, 0.62, 0, 1);

    //------ Custom Material
    this.textureMaterial = new CGFappearance(this.scene);
    this.textureMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.textureMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.textureMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.textureMaterial.setShininess(10.0);
    this.textureMaterial.loadTexture('images/tangram.png');
    this.textureMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
  }

  display() {
    // ===========================================Triangle Small
    this.scene.pushMatrix();
    this.scene.translate(-3.82, 0.417, 0);
    this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
    this.textureMaterial.apply();
    this.triangleSmall.texCoords = [
      0.5, 0.5,    //
      0.25, 0.75,  //
      0.75, 0.75,  //
    ];
    this.triangleSmall.updateTexCoordsGLBuffers();
    this.triangleSmall.display();
    this.scene.popMatrix();
    // =========================================================

    // =========================================== Parallelogram
    this.scene.pushMatrix();
    this.scene.translate(-1.12, -0.29, 0);
    this.scene.scale(-1, 1, 1);
    this.textureMaterial.apply();
    this.parallelogram.texCoords = [
      0.25, 0.75,  //
      0.5, 1,      //
      0.75, 1,     //
      1, 1,        //
      0.75, 0.75,  //
      0.5, 0.75,   //
    ];
    this.parallelogram.updateTexCoordsGLBuffers();
    this.parallelogram.display();
    this.scene.popMatrix();
    // =========================================================

    // ========================================== Small Triangle
    this.scene.pushMatrix();
    this.scene.translate(-1.4142, 0, 0);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1);
    this.textureMaterial.apply();
    this.triangleSmall.texCoords = [
      0.75, 0.75,  //
      0.25, 0.75,  //
      0.5, 0.5,    //
    ];
    this.triangleSmall.updateTexCoordsGLBuffers();
    this.triangleSmall.display();
    this.scene.popMatrix();
    // =========================================================

    // ================================================ Triangle
    this.scene.pushMatrix();
    this.scene.translate(1.7, -0.29, 0);
    this.textureMaterial.apply();
    this.triangle.texCoords = [
      0, 0.5,  //
      0, 1,    //
      0.5, 1,  //
    ];
    this.triangle.updateTexCoordsGLBuffers();
    this.triangle.display();
    this.scene.popMatrix();
    // =========================================================

    // ================================ Square (Rotated Diamond)
    this.scene.pushMatrix();
    this.scene.multMatrix([
      Math.cos(Math.PI / 4), Math.sin(Math.PI / 4), 0.0, 0.0,
      -Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), 0.0, 0.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 0.0, 1.0
    ]);
    this.textureMaterial.apply();
    this.diamond.texCoords = [
      0, 0.5,      //
      0.25, 0.75,  //
      0.25, 0.25,  //
      0.5, 0.5,    //
    ];
    this.diamond.updateTexCoordsGLBuffers();
    this.diamond.display();
    this.scene.popMatrix();
    // =========================================================

    // ============================================ Triangle Big
    this.scene.pushMatrix();
    this.scene.translate(2.117, -0.707, 0);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1);
    this.triangleBig.texCoords = [
      1, 0,      //
      0, 0,      //
      0.5, 0.5,  //
    ];
    this.triangleBig.updateTexCoordsGLBuffers();
    this.triangleBig.display();
    this.scene.popMatrix();
    // =========================================================

    // ============================================ Triangle Big
    this.scene.pushMatrix();
    this.scene.translate(4.945, -2.01, 0);
    this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
    this.triangleBig.texCoords = [
      0.5, 0.5,  //
      1, 1,      //
      1, 0,      //
    ];
    this.triangleBig.updateTexCoordsGLBuffers();
    this.triangleBig.display();
    this.triangleBig.display();
    this.scene.popMatrix();
    // =========================================================
  }
  /**
   * Called when user interacts with GUI to change object's complexity.
   * @param {integer} complexity - changes number of slices
   */
  updateBuffers() {
    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
  }
}
