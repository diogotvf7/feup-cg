import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import {MySphere} from '../MySphere.js';

import {MyLeaf} from './MyLeaf.js';
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

    this.heartRadius = heartRadius;
    this.stemRadius = stemRadius;
    this.stemSize = stemSize;
    this.petalColour = petalColour;

    this.leafColour = new CGFappearance(scene);
    this.leafColour.setAmbient(...leafColour, 1);
    this.leafColour.setDiffuse(...leafColour, 1);
    this.leafColour.setSpecular(...leafColour, 1);

    this.stemColour = new CGFappearance(scene);
    this.stemColour.setAmbient(...stemColour, 1);
    this.stemColour.setDiffuse(...stemColour, 1);
    this.stemColour.setSpecular(...stemColour, 1);

    this.heartColour = new CGFappearance(scene);
    this.heartColour.setAmbient(...heartColour, 1);
    this.heartColour.setDiffuse(...heartColour, 1);
    this.heartColour.setSpecular(...heartColour, 1);

    this.petalColour = new CGFappearance(scene);
    this.petalColour.setAmbient(...petalColour, 1);
    this.petalColour.setDiffuse(...petalColour, 1);
    this.petalColour.setSpecular(...petalColour, 1);


    this.stem = new MyStem(this.scene, this.stemRadius, this.stemSize, 30);

    this.sphere = new MySphere(this.scene, 20, 20, this.heartRadius, 1);
    this.petals = [];
    for (let i = 0; i < this.nPetals; i++) {
      const angle = Math.random() * Math.PI / 2 + Math.PI / 4;
      this.petals.push(new MyPetal(this.scene, 1, 1.5, angle, 0.3));
    }

    this.leafsPos = this.stem.leafs;
    console.log('leafsPos: ', this.leafsPos);
    this.leafs = [];
    for (let i = 0; i < this.leafsPos.length; i++) {
      const verticalRotation = (Math.random() > 0.5 ? -1 : 1) *
          ((Math.random() * Math.PI / 4) + Math.PI / 4);

      console.log('Rotation in rad: ', verticalRotation);

      this.leafs.push({
        obj: new MyLeaf(this.scene, stemRadius / 4, stemSize / 6, 1, 1.5),
        pos: this.leafsPos[i],
        rot: verticalRotation
      });
    }
  }
  display() {
    // Display the stem
    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.stemColour.apply();
    this.stem.display();
    this.scene.popMatrix();
    // ...................

    // Display the stamen
    const stamen_center = [
      this.stem.topCenter[0],
      this.stem.topCenter[1],
      this.stem.topCenter[2],
    ];
    this.scene.pushMatrix();
    this.scene.translate(...stamen_center);
    this.heartColour.apply();
    this.sphere.display();
    this.scene.popMatrix();
    // ...................

    // Display the petals
    const start = 5 * Math.PI / 4;
    const step = 7 * Math.PI / 4 / this.nPetals;
    for (let i = 0; i < this.nPetals; i++) {
      const petal = this.petals[i];
      const angle = start + i * step;
      this.scene.pushMatrix();
      this.scene.translate(
          stamen_center[0] +
              Math.cos(angle + Math.PI / 2) * this.heartRadius,  //
          stamen_center[1] +
              Math.sin(angle + Math.PI / 2) * this.heartRadius,  //
          stamen_center[2],                                      //
      );
      this.scene.rotate(angle, 0, 0, 1);
      this.leafColour.apply();
      petal.display();
      this.scene.popMatrix();
    }
    // ...................

    // Display the leafs
    for (let i = 0; i < this.leafs.length; i++) {
      const leaf = this.leafs[i];

      this.scene.pushMatrix();
      this.scene.translate(...leaf.pos);
      this.scene.rotate(leaf.rot, 0, 0, 1);
      leaf.obj.display();
      this.scene.popMatrix();
    }
    // ...................


    // this.scene.pushMatrix();
  }
}
