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
            "f": "KeyF",
            "p": "KeyP",
            "o": "KeyO",
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
        this.gui.add(this.scene, 'beeSpeed', 0.1, 3).name('Bee Speed').onChange(this.scene.updateBeeSpeed.bind(this.scene));
        this.gui.add(this.scene, 'beeScale', 0.5, 3).name('Bee Scale').onChange(this.scene.updateBeeScale.bind(this.scene));

        this.gui.add(this.scene, 'cameraPerspective', {
            'Third Person': 0,
            'First Person': 1,
        }).name('Camera Perspective');

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