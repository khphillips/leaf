import LeafBlade from '../utils/LeafBlade';
import VglGeometry from 'vue-gl/src/core/vgl-geometry';

/**
 * This is the quadrilateral primitive geometry component,
 * corresponding [THREE.BoxGeometry](https://threejs.org/docs/index.html#api/geometries/BoxGeometry).
 *
 * Properties of [VglGeometry](vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
  	'model' : {
      type: Object,
      // Object or array defaults must be returned from
      // a factory function
      default: function () {
        return {
	      "$id": 3,
	      "id": 3,
	      "material": "white",
	      "x": -3,
	      "y": 1,
	      "z": -2,
	      "rotate_x": 0,
	      "rotate_y": 0,
	      "rotate_z": 0,
	      "distort_x": 0,
	      "distort_y": 0,
	      "distort_z": 0,
	      "age": 1,
	      "length": 4,
	      "num_veins": 3,
	      "vein_length": 3,
	      "vein_reverse_arc": false,
	      "vein_distribution_curve_x1": 46,
	      "vein_distribution_curve_y1": 6,
	      "vein_distribution_curve_min": 0,
	      "vein_distribution_curve_max": 1,
	      "vein_angle_curve_x1": 0.5,
	      "vein_angle_curve_y1": 0.35,
	      "vein_angle_curve_min": 0.17,
	      "vein_angle_curve_max": 0.6,
	      "vein_length_curve_x1": 0.45,
	      "vein_length_curve_y1": 0.32,
	      "vein_length_curve_x2": 0.7,
	      "vein_length_curve_y2": 0.07,
	      "vein_length_curve_repeat": 1,
	      "vein_z_curve_x1": 0.4,
	      "vein_z_curve_y1": 0.07,
	      "vein_z_curve_x2": 0.83,
	      "vein_z_curve_y2": 0.33,
	      "vein_z_curve_max": 0.5
	    }
      }
    }, 
  	'name' : {
  		type : String,
  		default : 'noname'
  	}
  },
  computed: {
    inst() {
    	console.log(this.model)

    	var r = new LeafBlade(
	      	this.model, this.name
	      ).createLeafBladeGeometry()
    	console.log(r)
      return r
    },
  },
  watch : {
  	'model': function(newV){
  		console.log('blade model updated')
  	}
  }
};
