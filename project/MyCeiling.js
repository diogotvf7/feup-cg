import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyParallelipedo } from './MyParallelipedo.js';
import { MyTriangle } from './MyTriangle.js';

/**
 * MyCeiling
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCeiling extends CGFobject {
  constructor(scene, base, height) {
    super(scene);
    this.base = base;
    this.height = height;

    this.ceiling = new MyParallelipedo(scene, base, height, base);
    this.triangle = new MyTriangle(
        scene, 
        this.base * Math.cos(Math.PI / 4) * 2, 
        this.base * Math.sin(Math.PI / 4)
    );
  }
  display() {
    this.scene.pushMatrix();
    this.scene.translate(-this.base * Math.cos(Math.PI / 4), 0, -this.base/2);
    this.scene.rotate(Math.PI / 4, 0, 0, 1);
    this.ceiling.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(this.base * Math.cos(Math.PI / 4), 0, -this.base/2);
    this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
    this.ceiling.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, .8 * this.base / 2);
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -.8 * this.base / 2);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.triangle.display();
    this.scene.popMatrix();
  }
}