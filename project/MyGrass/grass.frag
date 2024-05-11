#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main() {
	//TODO: This do not work
	vec4 color = vec4(0.0, 0.5 + 0.5 * vTextureCoord.t, 0.0, 1.0);
	gl_FragColor = color;
}