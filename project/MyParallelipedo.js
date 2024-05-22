import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';

/**
 * MyParallelipedo
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelipedo extends CGFobject {
  constructor(scene, x, y, z) {
    super(scene);
    this.x = x;
    this.y = y;
    this.z = z;
    this.initBuffers();
  }
  initBuffers() {
    this.vertices = [
        0, 0, 0,    // 0    // 0 bot left back
        this.x, 0, 0,            // 1 bot right back
        this.x, this.y, 0,            // 2 top right back            
        0, this.y, 0,            // 3 top left back
        0, 0, this.z,            // 4 bot left front 
        this.x, 0, this.z,            // 5 bot right front
        this.x, this.y, this.z,            // 6 top right front 
        0, this.y, this.z,            // 7 top left front
        0, 0, 0,    // 1    // 0 bot left back
        this.x, 0, 0,            // 1 bot right back
        this.x, this.y, 0,            // 2 top right back            
        0, this.y, 0,            // 3 top left back
        0, 0, this.z,            // 4 bot left front 
        this.x, 0, this.z,            // 5 bot right front
        this.x, this.y, this.z,            // 6 top right front 
        0, this.y, this.z,            // 7 top left front
        0, 0, 0,    // 2    // 0 bot left back
        this.x, 0, 0,            // 1 bot right back
        this.x, this.y, 0,            // 2 top right back            
        0, this.y, 0,            // 3 top left back
        0, 0, this.z,            // 4 bot left front 
        this.x, 0, this.z,            // 5 bot right front
        this.x, this.y, this.z,            // 6 top right front 
        0, this.y, this.z,            // 7 top left front
    ];
    this.indices = [
        0, 1, 5,
        5, 4, 0,
        3, 6, 2,
        6, 3, 7, 
        0, 4, 7,
        7, 3, 0,
        1, 2, 6,
        6, 5, 1,
        0, 3, 2,
        2, 1, 0,
        4, 5, 6,
        6, 7, 4
    ];
    this.normals = [
        0, -1, 0,
        0, -1, 0,
        0, 1, 0,
        0, 1, 0,
        0, -1, 0,
        0, -1, 0,
        0, 1, 0,
        0, 1, 0,
        -1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        -1, 0, 0,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,        
    ];
    this.texCoords = [
        0, 1,
        1, 1,
        1, 0,
        0, 0,
        0, 1,
        1, 1,
        1, 0,
        0, 0,
        0, 1,
        1, 1,
        1, 0,
        0, 0,
        0, 1,
        1, 1,
        1, 0,
        0, 0,
        0, 1,
        1, 1,
        1, 0,
        0, 0,
        0, 1,
        1, 1,
        1, 0,
        0, 0,
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
