import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyPollen } from '../MyPollen.js';
import {MySphere} from '../MySphere.js';

import {MyLeaf} from './MyLeaf.js';
import {MyPetal} from './MyPetal.js';
import {MyStem} from './MyStem.js';
import {Position} from '../Position.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
  constructor(
      scene, position, nPetals, petalColour, heartRadius, heartColour, stemRadius,
      stemSize, stemColour, leafColour) {
    super(scene);

    this.position = position;

    this.nPetals = nPetals;
    this.petalColour = petalColour;
    this.heartRadius = heartRadius;
    this.heartColour = heartColour;
    this.stemRadius = stemRadius;
    this.stemSize = stemSize;
    this.stemColour = stemColour;
    this.leafColour = leafColour;

    this.petalTexture = new CGFtexture(scene, 'images/textures/plant.jpg');
    this.petalApperance = new CGFappearance(scene);
    this.petalApperance.setTexture(this.petalTexture);
    this.petalApperance.setTextureWrap('REPEAT', 'REPEAT');
    this.petalApperance.setAmbient(...petalColour, 1);
    this.petalApperance.setDiffuse(...petalColour, 1);
    this.petalApperance.setSpecular(...petalColour, 1);

    this.heartTexture =
        new CGFtexture(scene, 'images/textures/flower-heart.jpg');
    this.heartApperance = new CGFappearance(scene);
    this.heartApperance.setTexture(this.heartTexture);
    this.heartApperance.setTextureWrap('REPEAT', 'REPEAT');
    this.heartApperance.setAmbient(...heartColour, 1);
    this.heartApperance.setDiffuse(...heartColour, 1);
    this.heartApperance.setSpecular(...heartColour, 1);


    this.stemTexture = new CGFtexture(scene, 'images/textures/flower-stem.jpg');
    this.stemApperance = new CGFappearance(scene);
    this.stemApperance.setTexture(this.stemTexture);
    this.stemApperance.setTextureWrap('REPEAT', 'REPEAT');
    this.stemApperance.setAmbient(...stemColour, 1);
    this.stemApperance.setDiffuse(...stemColour, 1);
    this.stemApperance.setSpecular(...stemColour, 1);

    this.leafTexture = new CGFtexture(scene, 'images/textures/plant.jpg');
    this.leafApperance = new CGFappearance(scene);
    this.leafApperance.setTexture(this.leafTexture);
    this.leafApperance.setTextureWrap('REPEAT', 'REPEAT');
    this.leafApperance.setAmbient(...leafColour, 1);
    this.leafApperance.setDiffuse(...leafColour, 1);
    this.leafApperance.setSpecular(...leafColour, 1);

    this.stem = new MyStem(this.scene, this.stemRadius, this.stemSize, 30);

    this.stamen = new MySphere(this.scene, 20, 20, this.heartRadius, 1, 1, 0.2);
    this.petals = [];
    for (let i = 0; i < this.nPetals; i++) {
      const angle = Math.random() * Math.PI / 2 + Math.PI / 4;
      this.petals.push(
          new MyPetal(this.scene, 1, 1.5, Math.random() * 0.5, angle, 0.3));
    }

    this.leafsPos = this.stem.leafs;
    this.leafs = [];
    for (let i = 0; i < this.leafsPos.length; i++) {
      const verticalRotation = (Math.random() > 0.5 ? -1 : 1) *
          ((Math.random() * Math.PI / 4) + Math.PI / 4);
      this.leafs.push({
        obj: new MyLeaf(this.scene, stemRadius / 4, stemSize / 6, 1, 1.5),
        pos: this.leafsPos[i],
        rot: verticalRotation
      });
    }

    const stamen_center = [
      this.stem.topCenter[0],
      this.stem.topCenter[1],
      this.stem.topCenter[2],
    ];
    console.log("STAMEN:", stamen_center);
    this.pollen = new MyPollen(scene, new Position(position.x + this.stem.topCenter[0], position.y+stemSize, position.z + this.stem.topCenter[2]), 0.2);
  }
  display() {

    this.scene.pushMatrix();
    this.scene.translate(this.position.x, this.position.y, this.position.z);

    // Display the stem
    this.scene.pushMatrix();
    this.stemApperance.apply();
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
    this.heartApperance.apply();
    this.stamen.display();
    this.scene.popMatrix();
    // ...................

    // Display the petals
    const start = Math.PI / 2;
    const step = 2 * Math.PI / this.nPetals;
    for (let i = 0; i < this.nPetals; i++) {
      const petal = this.petals[i];
      const angle = start + i * step;
      this.scene.pushMatrix();
      this.scene.rotate(-Math.PI / 2, 1, 0, 0);
      this.scene.translate(
          0 + stamen_center[0] +
              Math.cos(angle + Math.PI / 2) * this.heartRadius,  //
          0 - stamen_center[2] +
              Math.sin(angle + Math.PI / 2) * this.heartRadius,  //
          0 + stamen_center[1],                                  //
      );
      this.scene.rotate(angle, 0, 0, 1);
      this.petalApperance.apply();
      petal.display();
      this.scene.popMatrix();
    }
    // ...................

    // Display the leafs,
    for (let i = 0; i < this.leafs.length; i++) {
      const leaf = this.leafs[i];

      this.scene.pushMatrix();
      this.scene.translate(...leaf.pos);
      this.scene.rotate(leaf.rot, 0, 0, 1);
      this.leafApperance.apply();
      leaf.obj.display();
      this.scene.popMatrix();
    }
    // ...................

    this.scene.popMatrix();
    if(this.pollen) this.pollen.display();
    this.scene.pushMatrix();

    this.scene.popMatrix();
  }
}
