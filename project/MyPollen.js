import { MySphere } from './MySphere.js';
import { CGFappearance } from '../lib/CGF.js';

export class MyPollen extends MySphere {
  constructor(scene, position, radius = 1) {
    super(scene, 20, 20, radius, 1, 1, 1, 1, radius * 2);
    this.scene = scene;

    this.appearance = new CGFappearance(scene);
    this.appearance.setAmbient(1, 1, 0, 1);
    this.appearance.setDiffuse(1, 1, 0, 1);
    this.appearance.setSpecular(0, 0, 0, 1);
  }

  display(){
    this.scene.pushMatrix();
    this.appearance.apply();
    super.display();
    this.scene.popMatrix();
  }
}
