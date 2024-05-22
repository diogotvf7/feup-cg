import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';
/**
* MyPlane
* @constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - number of divisions in both directions of the surface
*/
export class MyPlane extends CGFobject {
	constructor(scene, nrDivs) {
		super(scene);
		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
		this.nrDivs = nrDivs;
		this.size = 400;
		this.patchLength = this.size / nrDivs;
		this.minS = 0;
		this.maxS = 50;
		this.minT = 0;
		this.maxT = 50;
		this.q = (this.maxS - this.minS) / this.nrDivs;
		this.w = (this.maxT - this.minT) / this.nrDivs;

		this.texture = new CGFtexture(this.scene, 'images/plane.png');
		this.appearance = new CGFappearance(this.scene);
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');
		this.appearance.setAmbient(0.9, 0.9, 0.9, 1);
		this.appearance.setDiffuse(0.9, 0.9, 0.9, 1);
		this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.appearance.setShininess(10.0);

		this.initBuffers();
	}
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		var yCoord = 0.5;
		for (var j = 0; j <= this.nrDivs; j++) {
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) {
				this.vertices.push(xCoord, yCoord, 0);
				this.normals.push(0, 0, 1);
				this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
		}
		// Generating indices
		this.indices = [];

		var ind = 0;
		for (var j = 0; j < this.nrDivs; j++) {
			for (var i = 0; i <= this.nrDivs; i++) {
				this.indices.push(ind);
				this.indices.push(ind + this.nrDivs + 1);
				ind++;
			}
			if (j + 1 < this.nrDivs) {
				this.indices.push(ind + this.nrDivs);
				this.indices.push(ind);
			}
		}
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}

	setFillMode() { 
		this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
	}

	setLineMode() 
	{ 
		this.primitiveType=this.scene.gl.LINES;
	};

	display(){
		this.scene.pushMatrix();
		this.appearance.apply();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.translate(-this.size/2, this.size/2, 0);
		super.display();
		this.scene.popMatrix();
	}

}


