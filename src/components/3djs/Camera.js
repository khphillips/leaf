var THREE = require('three');
import Object3D from './Object3D'
export default class Camera extends Object3D{

	constructor(config, aspect){
		console.log('camera', config)
		super(config, {x : config.x, y : config.y, z : config.z});
		this.object = new THREE.PerspectiveCamera( this.cfg.fov, aspect, 0.1, 1000 );
		this.object.lookAt(new THREE.Vector3(config.lookAtX,config.lookAtY,config.lookAtZ));
		this.setPosition(config.x, config.y, config.z)		
	}
	
	update(config){
		super.update(config);
		this.setPosition(config.x, config.y, config.z)
		this.object.setFocalLength(config.fov);
		this.object.lookAt(config.lookAtX,config.lookAtY,config.lookAtZ);
	}
}