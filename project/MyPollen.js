import { MySphere } from './MySphere.js';
import { CGFappearance } from '../lib/CGF.js';

export class MyPollen extends MySphere {
  constructor(scene, position, radius = 1) {
    super(scene, 20, 20, radius, 1, 1, 1, 1, 2);
    this.scene = scene;
    this.position = position;

    this.appearance = new CGFappearance(scene);
    this.appearance.setAmbient(1, 1, 0, 1);
    this.appearance.setDiffuse(1, 1, 0, 1);
    this.appearance.setSpecular(0, 0, 0, 1);
  }

  display(){
    this.scene.pushMatrix();
    this.appearance.apply();
    this.scene.translate(this.position.x, this.position.y + this.radius, this.position.z);
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    super.display();
    this.scene.popMatrix();
  }
}
