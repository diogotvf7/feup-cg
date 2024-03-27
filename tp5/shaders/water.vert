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
	// timeFactor goes from 0 to 100
	vTextureCoord = aTextureCoord + vec2(1.5, 1) * (timeFactor * 0.01);

	vec4 position = vec4(aVertexPosition, 1.0);
	vec4 filter = texture2D(uSampler2, vTextureCoord);
	position.z += filter.g * 0.06;

	gl_Position = uPMatrix * uMVMatrix * position;
}

