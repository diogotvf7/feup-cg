import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import {normalizeVector} from '../utils.js';

import {MyCone} from './MyCone.js';
import {MyPetal} from './MyPetal.js';
import {MyStem} from './MyStem.js';

/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeaf extends CGFobject {
  constructor(scene, petioleRadius, petioleHeight, petalWidth, petalHeight) {
    super(scene);

    this.petioleRadius = petioleRadius;
    this.petioleHeight = petioleHeight;
    this.petalWidth = petalWidth;
    this.petalHeight = petalHeight;

    this.petiole =
        new MyStem(this.scene, this.petioleRadius, this.petioleHeight, 30);

    this.petioleTop = new MyCone(this.scene, this.petioleRadius, 30, 1, 0.2);

    const angle = Math.random() * Math.PI / 2 + Math.PI / 4;
    this.leaf =
        new MyPetal(this.scene, this.petalWidth, this.petalHeight, angle, 0.3);
  }
  display() {
    // Display the petiole
    this.petiole.display();

    const A = [
      this.petiole.topCenter[0],
      this.petiole.topCenter[1],
      this.petiole.topCenter[2],
    ];

    this.scene.pushMatrix();
    this.scene.translate(A[0], A[1], A[2]);
    this.petioleTop.display();
    this.scene.popMatrix();

    const B = [
      this.petiole.secondTopCenter[0],
      this.petiole.secondTopCenter[1],
      this.petiole.secondTopCenter[2],
    ];

    const AB = normalizeVector([B[0] - A[0], B[1] - A[1], B[2] - A[2]]);

    this.scene.pushMatrix();
    this.scene.translate(A[0], A[1], A[2]);
    // this.scene.rotate(Math.acos(AB[0]), 0, 1, 0);
    // this.scene.rotate(Math.acos(AB[1]), 1, 0, 0);
    this.leaf.display();
    this.scene.popMatrix();
  }
}
