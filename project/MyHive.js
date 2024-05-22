import { CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyCeiling } from './MyCeiling.js';
import { Object } from './Object.js';
import { Position } from './Position.js';

class HoneyKepper extends Object {
  constructor(scene, position, base, height, n) {
    super(scene, position);

    this.base = base;
    this.height = height;
    this.n = n;

    this.appearance = new CGFappearance(scene);
    this.appearance.setAmbient(1, 1, 0, 1);
    this.appearance.setDiffuse(1, 1, 0, 1);
    this.appearance.setSpecular(0, 0, 0, 1);
    
    this.texture = new CGFtexture(scene, 'images/textures/wood_hive_2.jpg');
    this.appearance.setTexture(this.texture);

    this.initBuffers();
  }
  
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    const h = this.height;
    const w = this.base / 2;

    this.vertices.push(
      -w, 0, w,
      w, 0, w,
      
      w, 0, -w,
      -w, 0, -w,

      -w, 0, w, //repeated

      -w, h, w,
      w, h, w,
      
      w, h, -w,
      -w, h, -w,

      -w, h, w, //repeated
    );

    const n = this.n;
    this.texCoords.push(
      0, n,
      0.25, n,
      0.5, n,
      0.75, n,
      1, n,
      0, n+1,
      0.25, n+1,
      0.5, n+1,
      0.75, n+1,
      1, n+1,
    );

    this.normals.push(
      1, 0, 0,
      1, 0, 1,
      -1, 0, -1,
      1, 0, 1,
      0, 0, 1,

      1, 0, 0,
      1, 0, 1,
      -1, 0, -1,
      1, 0, 1,
      0, 0, 1,
    );

    this.indices.push(
      0, 1, 5,
      1, 6, 5,

      1, 2, 6,
      2, 7, 6,

      2, 3, 7,
      3, 8, 7,

      3, 4, 8,
      4, 9, 8,

      4, 0, 9,
      0, 5, 9,

      3, 1, 0,
      1, 3, 2,

      8, 5, 6,
      6, 7, 8,
    );

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  display() {
    this.scene.pushMatrix();
    this.appearance.apply();
    super.display();
    this.scene.popMatrix();
  }

}


export class MyHive extends Object {
  constructor(scene, position, base, height) {
    super(scene, position);
    this.scene = scene;

    this.pollens = [];
    this.dropPollenSound = new Audio('audios/coin_drop.mp3');
    this.dropPollenSound.volume = 0.5;

    this.base = base;
    this.height = height;

    this.appearance = new CGFappearance(scene);
    this.appearance.setAmbient(1, 1, 0, 1);
    this.appearance.setDiffuse(1, 1, 0, 1);
    this.appearance.setSpecular(0, 0, 0, 1);

    this.ceiling_appearance = new CGFappearance(scene);
    this.ceiling_texture = new CGFtexture(scene, 'images/textures/wood_hive.jpg');
    this.ceiling_appearance.setTexture(this.ceiling_texture);
    this.ceiling_appearance.setAmbient(1, 1, 1, 1);
    this.ceiling_appearance.setDiffuse(1, 1, 1, 1);
    this.ceiling_appearance.setSpecular(1, 1, 1, 1);
    
    this.sound = new Audio('audios/hive.mp3');
    this.sound.oncanplay = () => {
      this.sound.loop = true;
      this.sound.volume = 0;
      this.sound.play();
    }

    this.honeyKeppers = [];
    let pos = position;
    this.honeyKeppers.push(new HoneyKepper(scene, pos, base, height/3, 0));
    this.honeyKeppers.push(new HoneyKepper(scene, new Position(pos.x, pos.y+height/3, pos.z), base, height/3, 0));
    this.honeyKeppers.push(new HoneyKepper(scene, new Position(pos.x, pos.y + (height/3)*2, pos.z), base, height/3, 0));

    this.celling = new MyCeiling(scene, base, 0.3);
  }

  display() {
    this.honeyKeppers.forEach(honeyKepper => {
      honeyKepper.display();
    });

    this.scene.pushMatrix();
    this.scene.translate(0, this.height, 0);
    this.scene.scale(1, .7, 1);
    this.ceiling_appearance.apply();
    this.celling.display();
    this.scene.popMatrix();
  }

  dropPollen(pollen) {
    this.pollens.push(pollen);
    this.dropPollenSound.play();
  }

  checkVolume(beePosition) {
    let x = this.position.x - beePosition.x;
    let z = this.position.z - beePosition.z;
    let distance = Math.sqrt(x*x + z*z);

    if(distance < 13) {
      this.sound.volume = 1 - distance/13;
    }else{
      this.sound.volume = 0;
    }
  }
}
