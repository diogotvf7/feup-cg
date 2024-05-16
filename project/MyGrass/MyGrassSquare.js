import { CGFappearance, CGFtexture, CGFshader } from '../../lib/CGF.js';
import { Object } from '../Object.js';
import { Position } from '../Position.js';
import { MyGrassBlade } from './MyGrassBlade.js';


export class MyGrassSquare extends Object {
  constructor(scene, position, width, height) {
    super(scene, position);

    this.width = width;
    this.height = height;


    this.grassBlades = [];
    //const n = width * height * 10;
    const n = 5;
    for (let i = 0; i < n; i++) {
      this.grassBlades.push(new MyGrassBlade(this.scene, new Position(
        Math.random() * this.width - this.width / 2,
        0,
        Math.random() * this.height - this.height / 2
      )));
    }
  }


  display() {
    this.scene.pushMatrix(); 
    //this.scene.setActiveShader(this.shader);
    //this.bladeTexture.bind(0);
    for (let i = 0; i < this.grassBlades.length; i++) {
      this.grassBlades[i].display();
    }
    //this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();
  }

  update(t) {
    //this.shader.setUniformsValues({ timeFactor: t / 100 % 360 });
  }
}
