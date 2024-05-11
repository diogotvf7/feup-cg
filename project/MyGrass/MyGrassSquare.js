import { CGFappearance, CGFtexture, CGFshader } from '../../lib/CGF.js';
import { Object } from '../Object.js';
import { Position } from '../Position.js';
import { MyGrassBlade } from './MyGrassBlade.js';


export class MyGrassSquare extends Object {
  constructor(scene, position, width, height) {
    super(scene, position);

    this.width = width;
    this.height = height;

    this.appearance = new CGFappearance(scene);
    this.appearance.setEmission(0.9, 0.9, 0.9, 1);
    this.appearance.setAmbient(0.6, 0.6, 0.6, 1);
    this.appearance.setDiffuse(0.6, 0.6, 0.6, 1);

    const bladeAppearance = new CGFappearance(scene);
    bladeAppearance.setEmission(0.9, 0.9, 0.9, 1);
    bladeAppearance.setAmbient(0.6, 0.6, 0.6, 1);
    bladeAppearance.setDiffuse(0.6, 0.6, 0.6, 1);
    const bladeTexture = new CGFtexture(scene, 'images/textures/flower-heart.jpg');
    bladeAppearance.setTexture(bladeTexture);
    bladeAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.texture = new CGFtexture(scene, 'images/textures/grass-soil.jpg');
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.shader = new CGFshader(this.scene.gl, './MyGrass/grass.vert', './MyGrass/grass.frag');
    this.shader.setUniformsValues({ timeFactor: 0, uSampler: 0 });

    this.grassBlades = [];
    const n = width * height * 10;
    for (let i = 0; i < n; i++) {
      this.grassBlades.push(new MyGrassBlade(this.scene, new Position(
        Math.random() * this.width - this.width / 2,
        0,
        Math.random() * this.height - this.height / 2
      ), bladeAppearance));
    }

    this.initBuffers();
  }

  initBuffers() {

    this.vertices = [
        -this.width / 2, 0, -this.height/2,
        this.width / 2, 0, -this.height/2, 
        -this.width / 2, 0, this.height/2,
        this.width / 2, 0, this.height/2,
    ];
    this.indices = [
        0, 1, 2,
        1, 3, 2,

        2, 1, 0,
        2, 3, 1,
    ];

    this.texCoords = [
        0, 0,
        1, 0,
        0, 1,
        1, 1,
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  display() {
    this.scene.pushMatrix(); 
    this.scene.setActiveShader(this.shader);
    for (let i = 0; i < this.grassBlades.length; i++) {
      this.grassBlades[i].display();
    }
    this.scene.setActiveShader(this.scene.defaultShader);
    //this.appearance.apply();
    //super.display();
    this.scene.popMatrix();
  }

  update(t) {
    this.shader.setUniformsValues({ timeFactor: t / 100 % 360 });
  }
}
