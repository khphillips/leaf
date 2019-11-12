var THREE = require('three');
import Cube from './Cube';
import Camera from './Camera';
/*import Plane from './Plane';
import Shape from './Shape'
import Shape2 from './Shape2'
import Shape3 from './Shape3'
import Shape4 from './Shape4'
import Shape5 from './Shape5'
import EaseLines from './EaseLines'
*/

//import Graph from './Graph'

export default class Scene{
	constructor(element_id){
		this.element_id = element_id;
		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer({
			precision : 'highp',
			antialias : true,
			powerPreference : 'high-performance',
			alpha : true,
			physicallyCorrectLights : true,
		});
		this.renderer.shadowMap.enabled = true
		this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
		this.did_init = false;
	}
	init(config){
		console.log('init', config)
		this.cfg = config;
		this.did_init = true;
		this.element = document.getElementById(this.element_id);
		this.camera = new Camera(this.cfg.config().camera, this.element.offsetWidth/this.element.offsetHeight);
		console.log(this.camera)
		this.renderer.setSize( this.element.offsetWidth,this.element.offsetHeight );
		this.element.appendChild( this.renderer.domElement );

		this.scene.add( new THREE.AmbientLight( 0xffffff, .5 ) );

		var directionalLight = new THREE.DirectionalLight( 0xffffff, .1 );
		directionalLight.position.set( 5, 20, 50 ).normalize();
		directionalLight.castShadow = true;
		directionalLight.shadow.mapSize.width = 1024;
		directionalLight.shadow.mapSize.height = 1024;
		directionalLight.shadow.camera.near = 1;
		directionalLight.shadow.camera.far = 100;
		//directionalLight.penumbra = 0.3
		this.scene.add( directionalLight );

		var particleLight = new THREE.Mesh( new THREE.SphereBufferGeometry( .5, 20, 20), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
		particleLight.position.y = 2;
		particleLight.position.x = -10;
		particleLight.position.z = 20;
		particleLight.castShadow = true;
		this.scene.add( particleLight );
		var pointLight = new THREE.PointLight( 0xffffff, .3, 800, 2 );
		//pointLight.castShadow = true;
		pointLight.shadow.camera.near = 1;
		pointLight.shadow.camera.far = 200;
		pointLight.shadow.mapSize.width = 1024;
		pointLight.shadow.mapSize.height = 1024;
		particleLight.add( pointLight );

		var spotLight = new THREE.SpotLight( 0xffffff, 1, 100, Math.PI / 50, .8, 2 );
		spotLight.position.set( -50, 3, 50 );
		spotLight.castShadow = true;
		spotLight.shadow.mapSize.width = 1024;
		spotLight.shadow.mapSize.height = 1024;
		spotLight.shadow.camera.near = 10;
		spotLight.shadow.camera.far = 200;
		this.scene.add( spotLight );

		//this.graph = new Graph('graph', this.cfg.config(), {x :0, y:-2.25, z:1.5});
		//this.scene.add( this.graph.object );
		//this.graph.object.lookAt(this.cfg.config().camera.x, this.cfg.config().camera.y, this.cfg.config().camera.z);

		//this.line = new EaseLines('line1', this.cfg.config().ease, {x :-3, y:-3, z:-3});
		//this.scene.add( this.line.object );

		this.cube = new Cube('cube1', this.cfg.config().cube, {x :0, y:0, z:0});
		this.scene.add( this.cube.object );
		//this.cube2 = new Cube('cube2', this.cfg.config().cube, {x :-2, y:0, z:0});
		//this.scene.add( this.cube2.object );

		//the leaf object <------------------------------
		//this.shape5 = new Shape5('shape5', this.cfg.config().shape3, {x :-2, y:-20, z:0});
		//this.scene.add( this.shape5.object );

		//var skeletonHelper = new THREE.SkeletonHelper( this.shape2.mesh );
		//skeletonHelper.material.linewidth = 2;
		//this.scene.add( skeletonHelper );

		//this.background = new Plane('background', this.cfg.config().plane, {x :-2, y:-3, z:-4});
		//this.scene.add( this.background.object );
		//this.animate();
		this.renderer.render( this.scene, this.camera.object );
		this.startAnimation()
	}
	addObject(obj){
		this.scene.add(obj);
		requestAnimationFrame( function(){console.log(obj)} );
	}
	updateConfig(cfg){
		this.cfg = cfg;
		this.shape5.update(this.cfg.config().shape3, this.scene);
		this.camera.update(this.cfg.config().camera)
	}
	startAnimation(){
		var g = this;
		var animate = function(){
			g.renderer.render( g.scene, g.camera.object );
			requestAnimationFrame( animate );
		}
		animate();
	}
	greeting(){
		return 'test';
	}
}