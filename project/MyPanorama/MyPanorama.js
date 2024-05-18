import { CGFappearance, CGFtexture, CGFshader } from "../../lib/CGF.js";
import { MySphere } from '../MySphere.js';

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama {
  constructor(scene) {
    this.scene = scene;

    this.texture = new CGFtexture(scene, 'images/panorama.jpg');
    this.cloudsTexture = new CGFtexture(scene, 'images/textures/clouds.jpg');
    this.textureMap = new CGFtexture(scene, 'images/panorama_map.png');
    this.shader = new CGFshader(scene.gl, 'MyPanorama/panorama.vert', 'MyPanorama/panorama.frag');
    this.shader.setUniformsValues({ uSampler3: 2, uSampler2: 1, timeFactor: 0});

    this.sphere = new MySphere(scene, 20, 20, 200, -1);
    
    this.apperance = new CGFappearance(scene);
    this.apperance.setTexture(this.texture);
    this.apperance.setTextureWrap('REPEAT', 'REPEAT');
    this.apperance.setEmission(1, 1, 1, 1);

    this.apperance.setAmbient(0, 0, 0, 0);
    this.apperance.setDiffuse(0, 0, 0, 0);
    this.apperance.setSpecular(0, 0, 0, 0);
    this.apperance.setShininess(0);

    this.timeFactor = 0;
  }

  display() {
    this.scene.setActiveShader(this.shader);
    this.cloudsTexture.bind(1);
    this.textureMap.bind(2);
    this.scene.pushMatrix();

    this.apperance.apply();
    this.sphere.display();

    this.scene.popMatrix();
    this.scene.setActiveShader(this.scene.defaultShader);
  }

  update() {
    this.timeFactor += 0.09;
    //this.timeFactor = this.timeFactor % 1000.0;
    this.shader.setUniformsValues({ timeFactor: this.timeFactor  });
  }
}
