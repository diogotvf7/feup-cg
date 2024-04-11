import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import {MySphere} from '../MySphere.js';

import {MyPetal} from './MyPetal.js';
import {MyStem} from './MyStem.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
  constructor(
      scene, x, y, z, nPetals, petalColour, heartRadius, heartColour,
      stemRadius, stemSize, stemColour, leafColour) {
    super(scene);
    this.x = x;
    this.y = y;
    this.z = z;
    this.nPetals = nPetals;
    this.petalColour = petalColour;
    this.heartRadius = heartRadius;
    this.heartColour = heartColour;
    this.stemRadius = stemRadius;
    this.stemSize = stemSize;
    this.stemColour = stemColour;
    this.leafColour = leafColour;

    this.stem = new MyStem(this.scene, this.stemRadius, this.stemSize, 30);
    this.sphere = new MySphere(this.scene, 20, 20, this.heartRadius, 1);
    this.petals = [];
    for (let i = 0; i < this.nPetals; i++) {
      const angle = Math.random() * Math.PI / 2 + Math.PI / 4;
      this.petals.push(new MyPetal(this.scene, 1, 1.5, angle, 0.3));
    }
  }
  display() {
    // Display the flower
    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.stem.display();
    this.scene.popMatrix();

    // Display the stamen
    const stamen_center = [
      this.stem.topCenter[0],
      this.stem.topCenter[1],
      this.stem.topCenter[2],
    ];
    this.scene.pushMatrix();
    this.scene.translate(...stamen_center);
    this.sphere.display();
    this.scene.popMatrix();

    // Display the petals
    const start = -Math.PI / 4;
    const step = 3 * Math.PI / 2 / this.nPetals;
    for (let i = 0; i < this.nPetals; i++) {
      const petal = this.petals[i];
      const angle = start + i * step;
      console.log(`angle[${i}]:`, angle);
      this.scene.pushMatrix();
      this.scene.translate(
          //
          stamen_center[0] + Math.cos(angle) * this.heartRadius,  //
          stamen_center[1] + Math.sin(angle) + this.heartRadius,  //
          stamen_center[2],                                       //
      );
      this.scene.rotate(angle, 0, 0, 1);

      petal.display();
      this.scene.popMatrix();
    }

    // this.scene.pushMatrix();
  }
}
