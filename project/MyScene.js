import { CGFappearance, CGFaxis, CGFcamera, CGFscene, CGFtexture } from '../lib/CGF.js';
import { MyGarden } from './MyGarden/MyGarden.js';
import { MyPanorama } from './MyPanorama/MyPanorama.js';
import { MyPlane } from './MyPlane.js';
import { MyRock } from './MyRock.js';
import { MySphere } from './MySphere.js';
import { MyBee } from './MyBee/MyBee.js';
import { Position } from './Position.js';
import { MyRockSet } from './MyRockSet.js';
import { MyPollen } from './MyPollen.js';
import { MyGrassSquare } from './MyGrass/MyGrassSquare.js';
import { MyHive } from './MyHive.js';

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
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 20, 20, 1, -1);
    this.garden = new MyGarden(this, 10, 10, 0.5);

    this.rock = new MyRock(this, new Position(-5, 0, 0), 20, 20);
    this.rockSet = new MyRockSet(this, 4);

    this.pollen = new MyPollen(this, new Position(0, 0, 0), 1);
    this.grass = new MyGrassSquare(this, new Position(0, -100, 0), 30, 30);
    this.hive = new MyHive(this, new Position(30, 0, 30), 5, 10);

    this.bee = new MyBee(this, this.garden, this.hive);

    // MyInterface Vars
    this.displayAxis = true;
    this.beeScale = 1;
    this.beeSpeed = 1;
    this.cameraPerspective = 0;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, 'images/terrain.jpg');
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.earthTexture = new CGFtexture(this, 'images/earth.jpg');
    this.earthAppearance = new CGFappearance(this);
    this.earthAppearance.setTexture(this.earthTexture);
    this.earthAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.panorama = new MyPanorama(this);

    this.nature_sound = new Audio('audios/nature.mp3');
    this.nature_sound.oncanplay = () => {
      this.nature_sound.loop = true;
      this.nature_sound.volume = 0.3;
      this.nature_sound.play();
    }

    // Update every 50ms
    this.setUpdatePeriod(50);
  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.5, 0.1, 1000, vec3.fromValues(0, 20, 0), vec3.fromValues(10, 15, 10));
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

    this.panorama.display();

    this.rockSet.display();

    this.rock.display();

    this.garden.display();

    this.hive.display();
    this.grass.display();

    this.plane.display();

    this.bee.display();

    // ---- END Primitive drawing section
  }

  update(t) {
    this.grass.update(t);
    this.panorama.update(t);
    this.bee.update(t);

    // Camera Fixed on bee
    if(this.cameraPerspective == 1) {
      this.camera.target = vec3.fromValues(this.bee.position.x, this.bee.flightHeight+5, this.bee.position.z);
    }
    // third person camera
    if(this.cameraPerspective == 2){
      this.camera.position = vec3.fromValues(
        this.bee.position.x - Math.sin(this.bee.orientation_xz)*5,
        //this.bee.flightHeight+5,
        this.bee.position.y + 5,
        this.bee.position.z - Math.cos(this.bee.orientation_xz)*5
      );      
      //update target based on bee orientation_xz
      this.camera.target = vec3.fromValues(
        this.bee.position.x + Math.sin(this.bee.orientation_xz)*5,
        //this.bee.flightHeight+2,
        this.bee.position.y + 3,
        this.bee.position.z + Math.cos(this.bee.orientation_xz)*5
      );
    }
    // first person camera
    if(this.cameraPerspective == 3){
      this.camera.position = vec3.fromValues(
        this.bee.position.x - Math.sin(this.bee.orientation_xz)*2,
        this.bee.position.y + 2,
        this.bee.position.z - Math.cos(this.bee.orientation_xz)*2
      );
      this.camera.target = vec3.fromValues(
        this.bee.position.x + Math.sin(this.bee.orientation_xz),
        this.bee.position.y + 2,
        this.bee.position.z + Math.cos(this.bee.orientation_xz)
      );
    }
  }

  updateBeeSpeed() {
    this.bee.updateSpeed(this.beeSpeed);
  }

  updateBeeScale() {
    this.bee.updateScale(this.beeScale);
  }

  updateCameraPerspective() {
    if(this.cameraPerspective == 0){
    }
    if(this.cameraPerspective == 1){
      this.camera.target = vec3.fromValues(this.bee.position.x, this.bee.flightHeight+5, this.bee.position.z);
    }
  }
}
