import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyAbdomen } from './MyAbdomen.js';
import { MyTorax } from './MyTorax.js';
import { MyHead } from './MyHead.js';
import { Position } from '../Position.js';
import { MyFlower } from '../MyFlower/MyFlower.js';
import { MyHive } from '../MyHive.js';
import { MyStinger } from './MyStinger.js';
import { MyWing } from './MyWing.js';

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
  constructor(scene, garden, hive) {
    super(scene);

    this.garden = garden;
    this.hive = hive;
    this.pollen = null;

    this.head = new MyHead(scene);
    this.torax = new MyTorax(scene);
    this.abdomen = new MyAbdomen(scene);
    this.stinger = new MyStinger(scene);
    this.wing = new MyWing(scene);

    this.scale = 1;
    this.speed = 0;
    this.turnSpeed = Math.PI / 30;
    this.wing_dir = 1;
    this.wing_angle = Math.PI / 4;

    this.flightHeight = 13;

    this.position = new Position(5, this.flightHeight, 5);
    this.position = new Position(30, this.flightHeight, 30);
    this.orientation_xz = Math.PI / 2;

    this.time = 0;

    // Flower, hive or higher altitude
    this.target = null;

    this.pick_audio = new Audio('audios/pick.mp3');
    this.pick_audio.volume = 0.5;
    this.bee_sound = new Audio('audios/bee_flying.mp3');
    this.bee_sound.oncanplay = () => {
      this.bee_sound.loop = true;
      this.bee_sound.volume = 0.04;
      this.bee_sound.play();
    }
    
    this.wingTexture = new CGFtexture(scene, 'images/textures/bee/wing.png');
    this.wingAppearance = new CGFappearance(scene);
    this.wingAppearance.setTexture(this.wingTexture);
    this.wingAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.wingAppearance.setAmbient(1, 1, 1, 0.2);
    this.wingAppearance.setDiffuse(1, 1, 1, 0.2);
    this.wingAppearance.setSpecular(1, 1, 1, 0.2);
    this.wingAppearance.setEmission(.1, .1, .1, 0.2);
    this.wingAppearance.setShininess(10);
  }

  display() {
    this.scene.pushMatrix();

    // Transformations
    this.scene.translate(this.position.x, this.position.y, this.position.z);
    this.scene.rotate(this.orientation_xz, 0, 1, 0); // Rotate the bee based on orientation
    this.scene.scale(this.scale, this.scale, this.scale);

    // Head    
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.3);
    this.scene.scale(1.75, 1.75, 1.75);
    this.scene.rotate(3 * Math.PI / 4, 1, 0, 0);
    this.head.display();    
    this.scene.popMatrix();
 
    // Torax
    this.scene.pushMatrix();
    this.scene.translate(0, -.5, 0);
    this.torax.display();
    this.scene.popMatrix();

    // Abdomen
    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, -.3);
    this.scene.rotate(-6 * Math.PI / 10, 1, 0, 0);
    this.scene.scale(.8, 2.3, .9);
    this.abdomen.display();
    this.scene.popMatrix();

    // Stinger
    this.scene.pushMatrix();
    this.scene.translate(0, -1.2, -2.42);
    this.scene.rotate(-6 * Math.PI / 10, 1, 0, 0);    
    this.stinger.display();
    this.scene.popMatrix();

    // Wing
    this.scene.pushMatrix();
    this.scene.translate(.25, 0, 0);
    this.scene.rotate(Math.PI / 6, 0 , 1, 0);
    this.scene.rotate(this.wing_angle, 0 , 0, 1);
    this.scene.scale(3, 3, 3);
    this.wingAppearance.apply();
    this.wing.display();
    this.scene.popMatrix();

    // Wing
    this.scene.pushMatrix();
    this.scene.translate(-.25, 0, 0);
    this.scene.rotate(-Math.PI / 6, 0 , 1, 0);
    this.scene.rotate(-this.wing_angle, 0 , 0, 1);
    this.scene.scale(-3, 3, 3);
    this.wingAppearance.apply();
    this.wing.display();
    this.scene.popMatrix();
    
    // Wing
    this.scene.pushMatrix();
    this.scene.translate(.25, 0, 0);
    this.scene.rotate(Math.PI / 4, 0 , 1, 0);
    this.scene.rotate(this.wing_angle - Math.PI / 30, 0 , 0, 1);
    this.scene.scale(3, 2, 2);
    this.wingAppearance.apply();
    this.wing.display();
    this.scene.popMatrix();

    // Wing
    this.scene.pushMatrix();
    this.scene.translate(-.25, 0, 0);
    this.scene.rotate(-Math.PI / 4, 0 , 1, 0);
    this.scene.rotate(-this.wing_angle - Math.PI / 30, 0 , 0, 1);
    this.scene.scale(-3, 2, 2);
    this.wingAppearance.apply();
    this.wing.display();
    this.scene.popMatrix();

    if (this.pollen) {
      this.pollen.display();
    }
  }
  turn(angle){
    this.orientation_xz += angle;
  }
  accelerate(value){
    this.speed += value;
  }

  decelerate(value) {
    this.speed -= value;
    if (this.speed < 0) {
      this.speed = 0;
    }
  }
  update(t) {
    this.time = (t % 1000) / 1000;

    this.wing_dir = this.wing_angle >= Math.PI / 4 || this.wing_angle <= - Math.PI / 4 
      ? -this.wing_dir 
      : this.wing_dir;
    this.wing_angle = this.wing_angle + this.wing_dir * Math.PI / 6;

    const pressedKeys = this.scene.gui.getPressedKeys();
    if (pressedKeys.length > 0) {
      if (pressedKeys.includes("w")) {
        this.accelerate(0.5);
      }
      if (pressedKeys.includes("s")) {
        this.decelerate(0.5);
      }

      if (pressedKeys.includes("a")) {
        this.turn(this.turnSpeed);
      }

      if (pressedKeys.includes("d")) {
        this.turn(-this.turnSpeed);
      }

      if (pressedKeys.includes("r")) {
        this.position = new Position(5, this.flightHeight, 5);
        this.orientation_xz = Math.PI / 2;
        this.speed = 0;
        this.target = null;
      }

      if (pressedKeys.includes("f")) {
        const flower = this.getClosestFlower();
        this.target = flower;
      }

      if (pressedKeys.includes("p")) {
        if (this.target instanceof MyFlower && this.target.pollen) {
          if(this.pollen == null){
            this.pollen = this.target.pollen;
            this.target.pollen = null;
            this.pick_audio.play();
          }
          this.pollen.position = new Position(this.position.x, this.flightHeight, this.position.z);
        }
        this.target = {
          position: new Position(this.position.x, this.flightHeight, this.position.z)
        }
      }

      if (pressedKeys.includes("o")) {
        if (this.pollen) {
          this.target = this.hive;
        }
      }
    }

    // Oscillating the bee
    this.position.y = this.position.y + 0.2 * Math.sin(2 * Math.PI * this.time);

    if (this.target) {
      this.moveToTarget(this.target);
    } else {
      this.position.x += this.speed * Math.sin(this.orientation_xz);
      this.position.z += this.speed * Math.cos(this.orientation_xz);
    }

    if(this.pollen){
      this.pollen.position = new Position(0, -2, 0);
    }

    this.hive.checkVolume(this.position)

  }

  updateScale(s) {
    this.scale = s;
  }

  updateSpeed(s) {
    this.speed = s;
  }

  getClosestFlower() {
    let closestFlower = this.garden.flowers[0];
    this.garden.flowers.forEach(flower => {
      if (flower.position.distance(this.position) < closestFlower.position.distance(this.position)) {
        closestFlower = flower;
      }
    });
    return closestFlower;
  }

  moveToTarget(target) {
    const targetPosition = new Position(target.position.x, target.position.y, target.position.z);

    if (target instanceof MyFlower) {
      targetPosition.y += target.stemSize;
      targetPosition.x += target.stem.topCenter[0];
      targetPosition.z += target.stem.topCenter[2];
    } 
    if (target instanceof MyHive) {
      targetPosition.y += target.height + 3;
    }

    // Calculate the direction vector towards the target
    const direction = new Position(
      targetPosition.x - this.position.x,
      targetPosition.y - this.position.y,
      targetPosition.z - this.position.z
    );

    if(this.speed == 0) this.speed = 0.1;

    // Calculate the distance to the target
    const distance = Math.sqrt(direction.x * direction.x + direction.y * direction.y + direction.z * direction.z);

    if (distance < 2.0) {
      this.speed = 0;
      if(!(target instanceof MyFlower)) this.target = null;

      if (target === this.hive && this.pollen) {
        this.hive.dropPollen(this.pollen);
        this.pollen = null;
      }
      
    } else {
      // Normalize the direction vector
      direction.x /= distance;
      direction.y /= distance;
      direction.z /= distance;

      // Move towards the target
      this.position.x += this.speed * direction.x;
      this.position.y += this.speed * direction.y;
      this.position.z += this.speed * direction.z;

      // Adjust orientation towards the target
      this.orientation_xz = Math.atan2(direction.x, direction.z);
    }
  }

}
