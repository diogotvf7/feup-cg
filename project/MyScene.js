import {CGFappearance, CGFaxis, CGFcamera, CGFscene, CGFtexture} from '../lib/CGF.js';

import {MyFlower} from './MyFlower/MyFlower.js';
import {MyStem} from './MyFlower/MyStem.js';
import {MyPanorama} from './MyPanorama.js';
import {MyPlane} from './MyPlane.js';
import {MyRock} from './MyRock.js';
import {MySphere} from './MySphere.js';
import {Position} from './Position.js';

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    // Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 20, 20, 3, -1);

    const petalColour = [
      Math.random(),
      Math.random(),
      Math.random(),
    ];
    const heartColour = [
      Math.random(),
      Math.random(),
      Math.random(),
    ];
    const stemColour = [
      Math.random(),
      Math.random(),
      Math.random(),
    ];
    const leafColour = [
      Math.random(),
      Math.random(),
      Math.random(),
    ];
    this.flower = new MyFlower(
        this, 0, 0, 0, 5, petalColour, 1, heartColour, 0.5, 4, stemColour,
        leafColour);
    this.testRock = new MyRock(this, new Position(0, 2, 0), 15, 15);
    this.stem = new MyStem(this, 3, 10, 20, null);

    this.flower = new MyFlower(
        this, 0, 0, 0, 5, 'red', 1, 'yellow', 0.5, 4, 'green', 'green');

    // Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, 'images/terrain.jpg');
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.earthTexture = new CGFtexture(this, 'images/earth.jpg');
    this.earthAppearance = new CGFappearance(this);
    this.earthAppearance.setTexture(this.earthTexture);
    this.earthAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.panoramaTexture = new CGFtexture(this, 'images/panorama.jpg');
    this.panorama = new MyPanorama(this, this.panoramaTexture);
  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
        1.5, 0.1, 1000, vec3.fromValues(5, 5, 5), vec3.fromValues(0, 0, 0));
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to
    // the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    // this.pushMatrix();
    // this.appearance.apply();
    // this.translate(0, -100, 0);
    // this.scale(400, 400, 400);
    // this.rotate(-Math.PI / 2.0, 1, 0, 0);
    // this.plane.display();
    // this.popMatrix();

    // this.pushMatrix();
    // this.sphere.enableNormalViz();
    // this.earthAppearance.apply();
    // this.sphere.display();
    // this.popMatrix();

    // this.panorama.display();
    //this.flower.display();
    // this.stem.display();

    this.testRock.display();

    this.panorama.display();
    // ---- END Primitive drawing section
  }
}
