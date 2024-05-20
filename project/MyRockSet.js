import { CGFobject } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';
import { Position } from './Position.js';


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

    // generate number_of_rocks, starting from 0, 0, 0 position and going up, scaling down the scaleX and scaleZ
    let current_y = 0;
    let scale = 2;
    let size = 2;
    for (let i = 0; i < number_of_rocks; i++) {
      this.rocks.push(new MyRock(scene, new Position(0, current_y, 0), 20, 10, size, scale, 1, scale));
      current_y += size*1.5;
      if(scale - 0.3 > 1) scale -= 0.3;
      size -= 0.4;
    }
  }

  display() {
    this.scene.pushMatrix();

    for (let rock of this.rocks) {
      rock.display();
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
