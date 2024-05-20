import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
        this.keys = {
            "w": "KeyW",
            "s": "KeyS",
            "a": "KeyA",
            "d": "KeyD",
            "r": "KeyR",
        };
    }

    init(application) {
        // call CGFinterface init
        super.init(application);

        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        this.initKeys();

        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'beeSpeed', 0.1, 3).name('Speed').onChange(this.scene.updateBeeSpeed.bind(this.scene));
        this.gui.add(this.scene, 'beeScale', 0.5, 3).name('Scale').onChange(this.scene.updateBeeScale.bind(this.scene));

        return true;
    }

    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function () { };
        this.activeKeys = {};
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
    getPressedKeys() {
        return Object.keys(this.keys).filter(keyCode => this.isKeyPressed(this.keys[keyCode]));
    }
}