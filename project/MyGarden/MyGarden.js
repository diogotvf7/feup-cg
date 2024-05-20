import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import {MyFlower} from '../MyFlower/MyFlower.js';

/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGarden extends CGFobject {
  constructor(scene, width, height, odd) {
    super(scene);
    this.width = width;
    this.height = height;
    this.odd = odd;

    this.flowerMx = Array.from(
        {length: height},
        () => Array.from(
            {length: width},
            () => Math.random() < odd  //
                ?
                (new MyFlower(
                    scene,                               // scene
                    Math.floor(Math.random() * 10) + 5,  // nPetals
                    [
                      Math.random(),
                      Math.random(),
                      Math.random(),
                    ],                          // petalColour
                    Math.random() * 0.5 + 0.5,  // heartRadius
                    [
                      Math.random(),
                      Math.random(),
                      Math.random(),
                    ],                          // heartColour
                    Math.random() * 0.3 + 0.1,  // stemRadius
                    Math.random() * 5 + 5,      // stemSize
                    [
                      Math.random(),
                      Math.random(),
                      Math.random(),
                    ],  // stemColour
                    [
                      Math.random(),
                      Math.random(),
                      Math.random(),
                    ],  // leafColour
                    ))  //
                :
                null));
  }
  display() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.flowerMx[i][j] !== null) {
          this.scene.pushMatrix();
          this.scene.translate(j * 4, 0, i * 4);
          this.flowerMx[i][j].display();
          this.scene.popMatrix();
        }
      }
    }
  }
}
