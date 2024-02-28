import {CGFinterface, dat} from '../lib/CGF.js';

/**
 * MyInterface
 * @constructor
 */
export class MyInterface extends CGFinterface {
  constructor() {
    super();
  }

  init(application) {
    // call CGFinterface init
    super.init(application);

    // init GUI. For more information on the methods, check:
    // https://github.com/dataarts/dat.gui/blob/master/API.md
    this.gui = new dat.GUI();

    // Checkbox element in GUI
    this.gui.add(this.scene, 'displayAxis').name('Display Axis');

    // Slider element in GUI
    this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

    // Tangram
    const tangram = this.gui.addFolder('Tangram');
    tangram.add(this.scene, 'displayTangram').name('Display Tangram');
    tangram.add(this.scene, 'tangramX', -10, 10).name('X');
    tangram.add(this.scene, 'tangramY', -10, 10).name('Y');
    tangram.add(this.scene, 'tangramZ', -10, 10).name('Z');
    tangram.open();

    // MyUnitCube
    const myUnitCube = this.gui.addFolder('MyUnitCube');
    myUnitCube.add(this.scene, 'displayMyUnitCube').name('Display MyUnitCube');
    myUnitCube.add(this.scene, 'unitCubeX', -10, 10).name('X');
    myUnitCube.add(this.scene, 'unitCubeY', -10, 10).name('Y');
    myUnitCube.add(this.scene, 'unitCubeZ', -10, 10).name('Z');
    tangram.open();


    // MyUnitCubeQuad
    const myUnitCubeQuad = this.gui.addFolder('MyUnitCubeQuad');
    myUnitCubeQuad.add(this.scene, 'displayMyUnitCubeQuad')
        .name('Display MyUnitCubeQuad');
    myUnitCubeQuad.add(this.scene, 'unitCubeQuadX', -10, 10).name('X');
    myUnitCubeQuad.add(this.scene, 'unitCubeQuadY', -10, 10).name('Y');
    myUnitCubeQuad.add(this.scene, 'unitCubeQuadZ', -10, 10).name('Z');

    return true;
  }
}