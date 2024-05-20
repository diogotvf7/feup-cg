import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyCylinder } from '../MyCylinder.js';
import {MySphere} from '../MySphere.js';
import { MyBeeBody } from './MyBeeBody.js';

/**
 * MyAntennae
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAntennae extends CGFobject {
  constructor(scene) {
    super(scene);
    // this.antenna = new MyCylinder(scene, 2, 10, [
    //   [0, 0],
    //   [18, 5],
    //   [-5, 6],
    //   [11, 10],
    // ]);
    // this.antenna = new MyCylinder(scene, 2, 10, [
    //   [0, 0],
    //   [30, 0],
    //   [-8, 10],
    //   [10, 13],
    // ]);
    this.left_antenna = new MyCylinder(
      scene, 
      .1, 
      [ [0, 0],
        [.4, .65],
        [-.5, .6],
        [1, .8] ],
      [ 
        [0, 0],
        [1, .2],
        [-.2, .4],
        [-.2, .4],
        [1, .6],
        [0, .8]
      ]
    );
    this.right_antenna = new MyCylinder(
      scene, 
      .1, 
      [ [0, 0],
        [.45, .75],
        [-.45, 1],
        [1, .35] ],
      [ 
        [0, 0],
        [1, .2],
        [-.2, .4],
        [-.2, .4],
        [1, .6],
        [0, .8]
      ]
    );

    // this.test = new MyCylinder(
    //   scene, 
    //   1, 
    //   [ [1, 0],
    //     [1, 0],
    //     [1, 1],
    //     [1, 1] ],
    //   [ 
    //     [0, 0],
    //     [1, .2],
    //     [-.2, .4],
    //     [-.2, .4],
    //     [1, .6],
    //     [0, .8]
    //   ]
    // );



    // black
    this.black = new CGFappearance(scene);
    this.black.setAmbient(0, 0, 0, 1);
    this.black.setDiffuse(0, 0, 0, 1);
    this.black.setSpecular(0, 0, 0, 1);
  }
  display() {
    this.scene.pushMatrix();
    this.black.apply();
    this.scene.translate(0.12, 0.3, 2);
    this.scene.rotate(-1 * Math.PI / 3, 0, 1, 0);
    this.right_antenna.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.black.apply();
    this.scene.translate(-0.12, 0.3, 2);
    this.scene.rotate(-2 * Math.PI / 3, 0, 1, 0);
    this.left_antenna.display();
    this.scene.popMatrix();

    // this.test.display();
  }
}
