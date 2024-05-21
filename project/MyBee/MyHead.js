import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyBezierCylinder } from '../MyBezierCylinder.js';
import {MySphere} from '../MySphere.js';
import { rgbToQuofficient } from '../utils.js';

/**
 * MyHead
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHead extends CGFobject {
  constructor(scene) {
    super(scene);
    console.log("CABEÇORRA");
    this.head = new MyBezierCylinder(
      scene,
      .5,
      [ 
        [0, 0],
        [0, 0],
        [0, 1],
        [0, 1] 
      ],
      [ 
        [0, 0],
        [1.5, 0],
        [.2, 1],
        [.8, 1],
        [0, 1],
      ],
    );
    console.log("CABEÇORRA");
    this.eye = new MySphere(scene, 16, 16, .2, 1, .7, 1.5, 2);
    this.left_antennae = new MyBezierCylinder(
      scene,
      .1,
      [ 
        [0, 0],
        [.4, .65],
        [-.5, .6],
        [1, .8] 
      ],
      [ 
        [0, 0],
        [1, .2],
        [-.2, .4],
        [-.2, .4],
        [1, .6],
        [0, .8]
      ]
    );
    this.right_antennae = new MyBezierCylinder(
      scene,
      .1,
      [ 
        [0, 0],
        [.45, .75],
        [-.45, 1],
        [1, .35] 
      ],
      [ 
        [0, 0],
        [1, .2],
        [-.2, .4],
        [-.2, .4],
        [1, .6],
        [0, .8]
      ]
    );
    this.mandibles = new MyBezierCylinder(
      scene,
      .3,
      // [
      //   [.1,  .4],
      //   [1,   0],
      //   [0,   0],
      //   [0,   0],
      //   [-1,  0],
      //   [-.1, .4],
      // ],
      [
        [.1,  .4],
        [1,   0],
        [.5,  -1],
        [.4,  0],
        [0,   0],
        [0,   0],
        [-.4,  0],
        [-.5,  -1],
        [-1,  0],
        [-.1, .4],
      ],
      [
        [0, 0],
        [1, .5],
        [0, 1],
      ],
      10,
      20,
      // [

      // ]
    );

    // head
    this.headTexture = new CGFtexture(scene, 'images/textures/bee/fur.png');
    this.headAppearance = new CGFappearance(scene);
    this.headAppearance.setTexture(this.headTexture);
    this.headAppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.headAppearance.setAmbient(.9, .9, .1, 1);
    this.headAppearance.setDiffuse(.9, .9, .1, 1);
    this.headAppearance.setSpecular(.9, .9, .1, 1);

    // eye
    this.eyeTexture = new CGFtexture(scene, 'images/textures/bee/eye.png');
    this.eyeAppearance = new CGFappearance(scene);
    this.eyeAppearance.setTexture(this.eyeTexture);
    this.eyeAppearance.setAmbient(0, 0, 0, 1);
    this.eyeAppearance.setDiffuse(.1, .1, .1, 1);
    this.eyeAppearance.setSpecular(.1, .1, .1, 1);

    // antennae
    this.antennaeAppearance = new CGFappearance(scene);
    this.eyeAppearance.setAmbient(0, 0, 0, 1);
    this.eyeAppearance.setDiffuse(.3, .3, .3, 1);
    this.eyeAppearance.setSpecular(1, 1, 1, 1);

  }
  display() {
    this.scene.pushMatrix();
    this.headAppearance.apply();
    this.head.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(.275, .4, 0);
    this.scene.rotate(Math.PI / 9, 0, 0, 1);
    this.eyeAppearance.apply();
    this.eye.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-.275, .4, 0);
    this.scene.rotate(-Math.PI / 9, 0, 0, 1);
    this.eyeAppearance.apply();
    this.eye.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.rotate(Math.PI / 3, -1, 0, 0);
    this.scene.translate(.5, 0, 0);
    this.scene.scale(.7, .7, .7);
    this.antennaeAppearance.apply();
    this.left_antennae.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.rotate(2 * Math.PI / 3, -1, 0, 0);
    this.scene.translate(.5, 0, 0);
    this.scene.scale(.7, .7, .7);
    this.antennaeAppearance.apply();
    this.right_antennae.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 1.015, 0);
    this.scene.scale(.3, .4, 1);
    this.antennaeAppearance.apply();    
    this.mandibles.display();
    this.scene.popMatrix();
  }
}
