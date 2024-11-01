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

    this.rockTexture = new CGFtexture(this, 'images/textures/lichen/lichen_diff.jpg');

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 20, 20, 1, -1);

    this.pollen = new MyPollen(this, new Position(0, 0, 0), 1);
    this.garden = new MyGarden(this, new Position(-40, 0, -40), 20, 20, .3);
    this.grass = new MyGrassSquare(this, new Position(0, 0, 0), 60, 60);
    this.hive = new MyHive(this, new Position(0, 0, 0), 5, 10);
    
    this.rockSets = [];
    this.rocks = [];

    for (let i = 0; i < 100; i++) {
      const dir = Math.random() * 2 * Math.PI;
      const shiftAppens = 40 + Math.random() * 150;

      const x = Math.cos(dir) * shiftAppens;
      const z = Math.sin(dir) * shiftAppens;

      if (Math.random() < 0.8) {
        this.rocks.push(new MyRock(this, this.rockTexture, new Position(x, 0, z), 20, 20, Math.random() * 4));
      } else {
        this.rockSets.push(new MyRockSet(this, this.rockTexture, 4, new Position(x, 0, z)));        
      }
    }

    this.bee = new MyBee(this, this.garden, this.hive);

    // MyInterface Vars
    this.displayAxis = false;
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

    this.loadingCameraIndex = 0;
    this.loadingPhase = true;
    // this.loadingPhase = false;
    this.cameraCounter = 0;

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        this.loadingPhase = false;
        this.camera_perpective = 1;
      }
    });

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
    this.loadingCameras = [
      new CGFcamera(1.5, 0.1, 1000, vec3.fromValues(10, 20, 10), vec3.fromValues(20, 5, 20)),
      new CGFcamera(1.5, 0.1, 1000, vec3.fromValues(35, 5, -20), vec3.fromValues(30, 8, -30)),
      new CGFcamera(1.5, 0.1, 1000, vec3.fromValues(50, 5, 50), vec3.fromValues(0, 20, 0)),
      new CGFcamera(1.5, 0.1, 1000, vec3.fromValues(15, 10, 15), vec3.fromValues(20, 10, 20)),
      new CGFcamera(1.5, 0.1, 1000, vec3.fromValues(8,10,-3), vec3.fromValues(5,13,5)),
      new CGFcamera(1.5, 0.1, 1000, vec3.fromValues(2, 2, 2), vec3.fromValues(15, 15, 15)),
    ]

    this.camera = this.loadingCameras[0];
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

    this.grass.display();

    this.panorama.display();

    this.rockSets.forEach(rockSet => rockSet.display());

    this.rocks.forEach(rock => rock.display());

    this.hive.display();
    
    this.garden.display();

    this.plane.display();

    this.pollen.display();

    this.bee.display();

    // ---- END Primitive drawing section
  }

  update(t) {
    this.grass.update(t);
    this.panorama.update(t);
    this.bee.update(t);

    if (this.loadingPhase) {
      this.cameraCounter++;
      if (this.cameraCounter % 50 == 0) {
        this.cameraCounter = 0;
        this.loadingCameraIndex = (this.loadingCameraIndex + 1) % this.loadingCameras.length;
        this.camera.position = this.loadingCameras[this.loadingCameraIndex].position;
        this.camera.target = this.loadingCameras[this.loadingCameraIndex].target;
      }
    }

    // Bee Fixed Camera
    if (this.cameraPerspective == 1) {
      this.camera.target = vec3.fromValues(this.bee.position.x, this.bee.flightHeight + 5, this.bee.position.z);
    }
    // 3rd Person camera
    if (this.cameraPerspective == 2) {
      this.camera.position = vec3.fromValues(
        this.bee.position.x - Math.sin(this.bee.orientation_xz) * 5,
        this.bee.position.y + 5,
        this.bee.position.z - Math.cos(this.bee.orientation_xz) * 5
      );
      this.camera.target = vec3.fromValues(
        this.bee.position.x + Math.sin(this.bee.orientation_xz) * 5,
        this.bee.position.y + 3,
        this.bee.position.z + Math.cos(this.bee.orientation_xz) * 5
      );
    }
    // 1st Person camera
    if (this.cameraPerspective == 3) {
      this.camera.position = vec3.fromValues(
        this.bee.position.x - Math.sin(this.bee.orientation_xz) * 0.5,
        this.bee.position.y + 1,
        this.bee.position.z - Math.cos(this.bee.orientation_xz) * 0.5
      );
      this.camera.target = vec3.fromValues(
        this.bee.position.x + Math.sin(this.bee.orientation_xz),
        this.bee.position.y + 1,
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
    if (this.cameraPerspective == 0) {
    }
    if (this.cameraPerspective == 1) {
      this.camera.target = vec3.fromValues(this.bee.position.x, this.bee.flightHeight + 5, this.bee.position.z);
    }
  }
}
