import {CGFappearance} from '../../lib/CGF.js';

// import {MySphere} from './MySphere.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the flower
 * @param height - Height of the flower
 */
export class MyFlower {
  constructor(scene, radius, height, colour, complexity) {
    this.scene = scene;
    this.radius = radius;
    this.height = height;
    this.colour = colour;
    this.complexity = complexity;


    this.apperance = new CGFappearance(scene);
    this.apperance.setTexture(this.texture);
    this.apperance.setTextureWrap('REPEAT', 'REPEAT');
    this.apperance.setEmission(1, 1, 1, 1);

    this.apperance.setAmbient(0, 0, 0, 0);
    this.apperance.setDiffuse(0, 0, 0, 0);
    this.apperance.setSpecular(0, 0, 0, 0);
    this.apperance.setShininess(0);

    this.cylinderHeights = [];
    let sum = 0;
    while (sum < height) {
      let height = Math.floor(Math.random() * height);
      this.cylinderHeights.push(height);
      sum += height;
    }
  }

  buildCylinder(baseCenter, radius, height) {
    this.vertices = [
      baseCenter[0], baseCenter[1], baseCenter[2],          //
      baseCenter[0], baseCenter[1], baseCenter[2] + height  //
    ];
    this.indices = [];
    this.normals = [];

    for (let i = 0; i < 

    const angle = 2 * Math.PI / this.slices;
  }

  initBuffers() {}


  display() {
    this.scene.pushMatrix();

    // this.sphere.enableNormalViz();
    this.apperance.apply();

    this.scene.popMatrix();
  }
}
