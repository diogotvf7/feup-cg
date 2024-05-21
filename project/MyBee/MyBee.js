import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyAbdomen } from './MyAbdomen.js';
import { MyTorax } from './MyTorax.js';
import { MyHead } from './MyHead.js';
import { MyAntennae } from './MyAntennae.js';
import { Position } from '../Position.js';
import { MyFlower } from '../MyFlower/MyFlower.js';
import { MyHive } from '../MyHive.js';

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

    //Body
    this.abdomen = new MyAbdomen(scene);
    this.torax = new MyTorax(scene);
    this.head = new MyHead(scene);
    this.antennae = new MyAntennae(scene);

    this.scale = 1;
    this.speed = 0;
    this.turnSpeed = Math.PI / 30;

    this.flightHeight = 13;

    this.position = new Position(0, this.flightHeight, 0);
    this.orientation_xz = Math.PI / 2;

    this.time = 0;

    // Flower, hive or higher altitude
    this.target = null;

    this.pick_audio = new Audio('audios/pick.mp3');
  }

  display() {
    this.scene.pushMatrix();

    // Transformations
    this.scene.translate(this.position.x, this.position.y, this.position.z);
    this.scene.rotate(this.orientation_xz, 0, 1, 0); // Rotate the bee based on orientation
    this.scene.scale(this.scale, this.scale, this.scale);

    // Body displayments
    this.abdomen.display();
    this.torax.display();
    this.head.display();    
    this.antennae.display();

    if (this.pollen) this.pollen.display();

    this.scene.popMatrix();
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
  update(t){
    this.time = (t % 1000) / 1000;

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
        this.position = new Position(0, this.flightHeight, 0);
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
    console.log(targetPosition)

    if (target instanceof MyFlower) {
      targetPosition.y += target.stemSize;
      targetPosition.x += target.stem.topCenter[0];
      targetPosition.z += target.stem.topCenter[2];
    } 
    if (target instanceof MyHive) {
      targetPosition.y += target.height;
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
