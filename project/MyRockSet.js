import { CGFobject } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';


// import {MyPrism} from './MyPrism.js';

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices around the sphere
 * @param stacks - Number of stacks along the sphere
 * @param radius - Sphere radius
 * @param normals_direction - Direction of normals
 */
export class MyRockSet extends CGFobject {
  constructor(scene, number_of_rocks) {
    super(scene);

    this.rocks = []

    for (let i = 0; i < number_of_rocks; i++) {
      this.rocks.push(new MyRock(scene, 15, 15, 2, 1, 1, 1));
    }
  }

  display() {
    this.scene.pushMatrix();

    for (let i = 0; i < this.number_of_rocks; i++) {
      this.scene.translate(Math.random() * 10 - 5, 0, Math.random() * 10 - 5);
      this.scene.scale(0.5, 0.5, 0.5);
      this.scene.rotate(Math.random() * 2 * Math.PI, 0, 1, 0);
      this.scene.rock.display();
    }

    this.scene.popMatrix();
  }

  /**
   * Called when user interacts with GUI to change object's complexity.
   * @param {integer} complexity - changes number of slices
   */
  updateBuffers(complexity) {
    this.slices = 3 +
        Math.round(
            9 * complexity);  // complexity varies 0-1, so slices varies 3-12

    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
  }
}
