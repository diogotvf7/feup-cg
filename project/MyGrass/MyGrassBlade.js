import { CGFappearance, CGFtexture, CGFshader } from '../../lib/CGF.js';
import { Object } from '../Object.js';


export class MyGrassBlade extends Object {
  constructor(scene, position) {
    super(scene, position);

    this.width = 0.3 + Math.random() * 0.4;
    this.height = 0.6 + Math.random() * 2;

    this.rotation = Math.random() * Math.PI;

    this.appearance = new CGFappearance(scene);
    this.appearance.setEmission(0.9, 0.9, 0.9, 1);
    this.appearance.setAmbient(0.6, 0.6, 0.6, 1);
    this.appearance.setDiffuse(0.6, 0.6, 0.6, 1);

    this.texture = new CGFtexture(scene, 'images/textures/wood_hive.jpg');
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.shader = new CGFshader(this.scene.gl, './MyGrass/grass.vert', './MyGrass/grass.frag');
    this.shader.setUniformsValues({ timeFactor: 0, uSampler: 0});

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];

    this.vertices.push(
      -this.width / 2,0, 0,
      this.width / 2,0, 0,
      -this.width / 4, this.height / 2, 0,
      this.width / 4, this.height / 2, 0,
      0, this.height, 0,
    );

    this.indices.push(
      // Front
      0, 1, 2,
      1, 3, 2,
      2, 3, 4,

      // Back
      2, 1, 0,
      2, 3, 1,
      4, 3, 2,
    );

    this.texCoords = [
      0, 0,
      1, 0,
      0.25, 0.5,
      0.75, 0.5,
      1, 1
    ];
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  display() {
    this.scene.pushMatrix(); 
    this.scene.rotate(this.rotation, 0, 1, 0);
    this.scene.setActiveShader(this.shader);
    this.texture.bind(0);
    super.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    
    this.scene.popMatrix();
  }
}
