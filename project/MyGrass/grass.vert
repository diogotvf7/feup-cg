attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler;
uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {
    vec4 position = vec4(aVertexPosition, 1.0);

    position.x += sin(timeFactor + aVertexPosition.y) * 0.05 * aVertexPosition.y;
	
    position = uPMatrix * uMVMatrix * position;
    vTextureCoord = aTextureCoord;
    
    gl_Position = position;
}
