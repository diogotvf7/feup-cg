#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

void main() {
	vec4 color = texture2D(uSampler2, vTextureCoord);
    gl_FragColor = color;
}