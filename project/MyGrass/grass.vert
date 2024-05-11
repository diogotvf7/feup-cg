attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {
	vec4 position = vec4(aVertexPosition, 1.0);
	position = uPMatrix * uMVMatrix * position;
	
	if (position.y > 0.3) {
		position.x = position.x + sin(timeFactor * 0.1) * 0.2;
		position.y = position.y + sin(timeFactor * 0.1) * 0.2;
	}

	gl_Position = position;
}

