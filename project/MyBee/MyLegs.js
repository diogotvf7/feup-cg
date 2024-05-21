import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyBezierCylinder } from '../MyBezierCylinder.js';
import {MySphere} from '../MySphere.js';
import { MyBeeBody } from './MyBeeBody.js';

/**
 * MyLegs
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLegs extends CGFobject {
  constructor(scene) {
    super(scene);
    this.leg = new MyBezierCylinder(
      scene, 
      .2, 
      [ 
        [0, .5],
        [.3, 0],
        [1, 1.4],
        [.7, .05],
        [1.1, 0] 
      ],
      [ 
        [0, 0],
        [.7, .2],
        [0, .4],
        [0, .4],
        [1.2, .6],
        [.1, .7],
        [.1, .7],
        [1.2, .8],
        [0.2,  .8],
        [0,  9]
      ],
      5
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
    // this.scene.pushMatrix();
    // this.black.apply();
    // this.scene.translate(0.12, 0.3, 2);
    // this.scene.rotate(-1 * Math.PI / 3, 0, 1, 0);
    this.leg.display();
    // this.scene.popMatrix();

    // this.test.display();
  }
}
