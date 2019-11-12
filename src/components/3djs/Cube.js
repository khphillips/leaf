var THREE = require('three');
import Object3D from './Object3D'
export default class Cube extends Object3D{

	constructor(name, config, position){
		super(name, config, position);
		this.vertice_attributes = ['width', 'height', 'depth'];
		console.log("Cube", config)
		var line_material = new THREE.MeshPhysicalMaterial( { 
			color: 0xffffff,
			metalness: 0,
			roughness: 0.5,
			clearCoat: 1.0,
			clearCoatRoughness: 1.0,
			reflectivity: .5,
			polygonOffset: true,
			polygonOffsetFactor: 1,
			polygonOffsetUnits: 1,
			wireframe: true,
			transparent :true,
			opacity : .3 }
		);

		var material = new THREE.MeshPhysicalMaterial( { 
			color: 0xff0000,
			transparent :true,
			opacity : 1,
			metalness: 0,
			roughness: 0.5,
			clearCoat: 1.0,
			clearCoatRoughness: 1.0,
			reflectivity: .5,
			polygonOffset: true,
			polygonOffsetFactor: 1,
			polygonOffsetUnits: 1,
			}
		);
		this.geometry = new THREE.BoxGeometry( config.width, config.height, config.depth );
		this.geometry.dynamic = true;
		this.object = new THREE.Group();
		this.object.rotation.y = config.rotate * Math.PI/180
		this.mesh = new THREE.Mesh( this.geometry, material );
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		this.line = new THREE.LineSegments( this.geometry, line_material );
		this.object.add(this.mesh);
		this.object.add(this.line);
		this.setPosition(position.x, position.y, position.z)
	}
	
	update(config){
		var diff = super.update(config);
		if (diff.filter(value => ['width', 'height', 'depth'].includes(value)).length > 0){
			this.geometry.dispose();
			this.geometry = new THREE.BoxGeometry( this.cfg.width, this.cfg.height, this.cfg.depth );
			this.mesh.geometry = this.geometry;
			this.line.geometry = this.geometry;
		}
		if (['rotate'].filter(value => diff.includes(value)).length > 0){
			this.object.rotation.y = this.cfg.rotate * Math.PI/180;
		}
		if (['scale'].filter(value => diff.includes(value)).length > 0){
			this.object.scale.x = this.cfg.scale_x;
			this.object.scale.y = this.cfg.scale_y;
			this.object.scale.z = this.cfg.scale_z;
		}
	}
}