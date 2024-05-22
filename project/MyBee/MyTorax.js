import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyBezierCylinder } from '../MyBezierCylinder.js';

/**
 * MyTorax
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTorax extends CGFobject {
  constructor(scene) {
    super(scene);
    this.torax = new MyBezierCylinder(
      scene,
      1,
      [ 
        [0, 0],
        [0, 0],
        [0, 1],
        [0, 1] 
      ],
      [
        [0, 1],
        [.8, 1],
        [.2, 1],
        [1.5, 0],
        [0, 0],
      ],
      10,
      10
    );
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
      5,
      10
    )

    this.beeTexture = new CGFtexture(scene, 'images/textures/bee/torax.png');
    this.beeAppearance = new CGFappearance(scene);
    this.beeAppearance.setTexture(this.beeTexture);
    this.beeAppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.beeAppearance.setAmbient(0.1, 0.1, 0.1, 1);
    this.beeAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
    this.beeAppearance.setSpecular(0.1, 0.1, 0.1, 1);

  }
  display() {
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -.5);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.beeAppearance.apply();
    this.torax.display();
    this.scene.popMatrix();

    // Front right leg
    this.scene.pushMatrix();
    this.scene.translate(-.3, -.9, 0);
    this.scene.rotate(-2 * Math.PI / 3, 0, 1, 0);
    this.scene.rotate(-Math.PI / 5, 0, 0, 1);
    this.scene.scale(1.3, 1.5, 1.3);
    this.leg.display();
    this.scene.popMatrix();

    // Front left leg
    this.scene.pushMatrix();
    this.scene.translate(.3, -.9, 0);
    this.scene.rotate(-Math.PI / 3, 0, 1, 0);
    this.scene.rotate(-Math.PI / 5, 0, 0, 1);
    this.scene.scale(1.3, 1.5, 1.3);
    this.leg.display();
    this.scene.popMatrix();

    // Middle right leg
    this.scene.pushMatrix();
    this.scene.translate(0, -.9, 0);
    this.scene.rotate(-Math.PI / 5, 0, 0, 1);
    this.scene.scale(1.3, 1.5, 1.3);
    this.leg.display();
    this.scene.popMatrix();

    // Middle left leg
    this.scene.pushMatrix();
    this.scene.translate(0, -.9, 0);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.rotate(-Math.PI / 5, 0, 0, 1);
    this.scene.scale(1.3, 1.5, 1.3);
    this.leg.display();
    this.scene.popMatrix();

    // Back right leg
    this.scene.pushMatrix();
    this.scene.translate(-.2, -.7, 0);
    this.scene.rotate(2 * Math.PI / 3, 0, 1, 0);
    this.scene.rotate(-Math.PI / 6, 0, 0, 1);
    this.scene.scale(2, 1.5, 1.3);
    this.leg.display();
    this.scene.popMatrix();

    // Back left leg
    this.scene.pushMatrix();
    this.scene.translate(.2, -.7, 0);
    this.scene.rotate(Math.PI / 3, 0, 1, 0);
    this.scene.rotate(-Math.PI / 6, 0, 0, 1);
    this.scene.scale(2, 1.5, 1.3);
    this.leg.display();
    this.scene.popMatrix();

  }
}
