// this is the fragment shader: it is called for each fragment (i.e. a pixel)

#ifdef GL_ES
precision highp float;
precision highp int;
#endif

uniform vec3 u_LightColor;
uniform vec3 u_LightPosition;
uniform vec3 u_AmbientLight;
uniform vec3 u_SpecularLight;

varying vec4 v_Color;
varying vec3 v_Normal;
varying vec3 v_Position;

uniform float u_shine;
uniform int u_shade_toggle;

void main() {
	vec3 normal = normalize(v_Normal);
	vec3 lightDirection = normalize(u_LightPosition - v_Position);
	
	float nDotL = max(dot(lightDirection, v_Normal), 0.0);

	vec3 viewDirection = vec3(0, 0, 1);
	vec3 reflectedVector = reflect(-lightDirection, normal);

	//float shine = 25.0;
	float dotted = dot(reflectedVector, lightDirection);
	float rDotVp = max(pow(dotted, u_shine), 0.0);

	vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;
 	vec3 ambient = u_AmbientLight * v_Color.rgb;
  	vec3 specular = u_SpecularLight * rDotVp;

  	int shading_type = u_shade_toggle;
  	if(shading_type == 1){	//Phong
  		 //gl_FragColor = v_Color;
  		 gl_FragColor = vec4(diffuse + ambient + specular, v_Color.a);
  	}
  	else{
  		gl_FragColor = v_Color;
  	}
}
