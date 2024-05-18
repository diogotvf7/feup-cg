attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec3 vPosition;

void main() {
    // Transform the vertex position
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

    // Pass the texture coordinate to the fragment shader
    vTextureCoord = aTextureCoord;

    // Pass the vertex position to the fragment shader
    vPosition = aVertexPosition;
}
