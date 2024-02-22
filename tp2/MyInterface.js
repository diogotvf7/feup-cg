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

    this.gui.add(this.scene, 'moveX', -5.1, 5.1).name('Move X');
    this.gui.add(this.scene, 'moveY', -5.1, 5.1).name('Move Y');
    this.gui.add(this.scene, 'rotation', 0, 360).name('Rotate');

    // Checkboxes for Diamond and Triangle
    const objects = this.gui.addFolder('Objetos');
    objects.add(this.scene, 'displayTangram').name('Display Tangram');
    objects.add(this.scene, 'displayQuad').name('Display Quad');
    objects.add(this.scene, 'displayMyUnitCubeQuad')
        .name('Display MyUnitCubeQuad');



    return true;
  }
}