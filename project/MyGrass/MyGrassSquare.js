import { CGFappearance, CGFtexture, CGFshader, CGFobject} from '../../lib/CGF.js';
import { Object } from '../Object.js';
import { Position } from '../Position.js';
import { MyGrassBlade } from './MyGrassBlade.js';


export class MyGrassSquare extends CGFobject {
  constructor(scene, position, width, height) {
    super(scene);

    this.position = position;

    this.width = width;
    this.height = height;
    this.texture = new CGFtexture(scene, 'images/textures/grass.jpg');
    this.shader = new CGFshader(scene.gl, './MyGrass/grass.vert', './MyGrass/grass.frag');
    this.shader.setUniformsValues({ uSampler2: 1, timeFactor: 0});

    this.grassBlades = [];
    const n = width * height * 2;
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

    this.scene.translate(this.position.x, this.position.y, this.position.z);

    this.scene.setActiveShader(this.shader);
    this.texture.bind(1);
    for (let i = 0; i < this.grassBlades.length; i++) {
      this.grassBlades[i].display();
    }
    this.scene.setActiveShader(this.scene.defaultShader);

    this.scene.popMatrix();
  }

  update(t) {
    this.shader.setUniformsValues({ timeFactor: t / 100 % 360 });
  }
}
