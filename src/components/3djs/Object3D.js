var THREE = require('three');

export default class Object3D{
	constructor(name, config, position){
		if (typeof config == 'undefined'){
			config = {};
		}
		this.cfg = config;
		this.material = this.setMaterial({});
		this.name = name;
	}
	setPosition(x, y, z){
		console.log(this.name, x,y,z)
		this.object.position.x = x;
		this.object.position.y = y;
		this.object.position.z = z;
	}
	translate(x, y, z){
		this.object.position.x = this.object.position.x + x;
		this.object.position.y = this.object.position.y + y;
		this.object.position.z = this.object.position.z + z;
	}
	update(config){
		var diff = this.diffConfig(this.cfg, config, '');
		//console.log(this.name, JSON.stringify(diff));
		//if (diff.length == 0) return [];
		this.cfg = config;
		return diff;
	}
	updateMaterial(){
		this.material.dispose();
		this.mesh.material = this.setMaterial();
		//console.log(this.object.material)
	}
	setMaterial(){
		//console.log("updating mat", this.cfg.material)
		if (typeof this.cfg.material != 'undefined'){
			return this.material = new THREE.MeshStandardMaterial(this.cfg.material);
		}
	}
	diffConfig(oldV, newV, parent){
		//find the differences between a config to see what needs updating and only update those. 
		var ra = [];
		if(typeof newV == 'undefined' || newV == null) return ra;
		var keys = Object.keys(newV);
		for (var i = 0; i < keys.length; i++){
			var key = keys[i]
			if (typeof newV[key] == 'object'){
				var d = this.diffConfig(oldV[key], newV[key], key)
				if (parent == ''){
					ra = ra.concat(d);
				}else{
					ra = ra.concat(d);
				}
			}else{
				if (typeof oldV[key] != 'undefined'  && oldV[key] != newV[key]){
					if (parent == ''){
						ra.push(key);
					}else{
						ra.push(parent + "." + key);
					}
					//console.log(ra)
				}
			}
		}
		return ra;
	}
}