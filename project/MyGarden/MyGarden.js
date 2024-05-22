import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import {MyFlower} from '../MyFlower/MyFlower.js';
import { Position } from '../Position.js';

/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGarden extends CGFobject {
  constructor(scene, position, width, height, odd) {
    super(scene);
    this.position = position;
    this.width = width;
    this.height = height;
    this.flowers = [];

    this.textures = [
      new CGFtexture(scene, 'images/textures/plant.jpg'),
      new CGFtexture(scene, 'images/textures/flower-heart.jpg'),
      new CGFtexture(scene, 'images/textures/flower-stem.jpg'),
    ];

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (Math.random() < odd && (this.notIn(.2, j, width) || this.notIn(.2, i, height))) {
          this.flowers.push(new MyFlower(
              scene, // scene
              new Position(j * 4, 0, i * 4),
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
              this.textures
          ));
        }
      }
    }
  }
  notIn(gap, i, max) {
    const half = max * gap / 2;
    const inteval = [max / 2 - half, max / 2 + half];
    return i < inteval[0] || i > inteval[1];
  }
  display() {
    this.scene.pushMatrix();
    this.scene.translate(this.position.x, this.position.y, this.position.z);
    this.flowers.forEach((flower) => {
      flower.display();
    });
    this.scene.popMatrix();
  }
}
