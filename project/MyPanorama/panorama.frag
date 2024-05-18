#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vPosition;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;
uniform float timeFactor;

void main() {
    vec4 sky = texture2D(uSampler, vTextureCoord);
    vec4 sky_map = texture2D(uSampler3, vTextureCoord);

    // Convert position to spherical coordinates
    float longitude = atan(vPosition.y, vPosition.x);
    float latitude = asin(vPosition.z / length(vPosition));

    vec2 sphericalCoord = vec2((longitude / (2.0 * 3.1415926535897932384626433832795)) + 0.5, (latitude / 3.1415926535897932384626433832795) + 0.5);

    vec2 animatedCoord = vec2(fract(sphericalCoord.x + 0.001 * timeFactor), sphericalCoord.y);
    vec4 cloudColor = texture2D(uSampler2, animatedCoord);

    if (sky_map.r > 0.5 && cloudColor.r > 0.75) {
        sky = mix(sky, cloudColor, 0.8);
    }

    gl_FragColor = sky;
}
