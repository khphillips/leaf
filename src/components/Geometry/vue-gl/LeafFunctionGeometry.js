import { ParametricBufferGeometry } from 'three';
import VglGeometry from 'vue-gl/src/core/vgl-geometry';
import { number } from 'vue-gl/src/validators';

/**
 * A component for generating torus geometries,
 * corresponding [THREE.TorusGeometry](https://threejs.org/docs/index.html#api/geometries/TorusGeometry).
 *
 * Properties of [VglGeometry](vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    model : {
      type : Object,
      default : function(){
        return {
          "age": 1,
          "length": 3,
          "num_veins": 2,
          "vein_length": 2,
        }
      }
    }
  },
  methods : {
    leafFunction : function(u, v, target){
      //u is the length along the vein / width
      //v is the distance up the blade / height
      //find the distance up the blade
      var vein_position = v * (this.model.length + 1); // this will be a fraction ie. 1.5
      var prev_vein = Math.floor(vein_position / 1);
      var next_vein = Math.ceil(vein_position / 1);
      var vein_t = vein_position % 1; 

      prev_vein = {
        origin_x : 0,
        origin_y : (this.model.length / parseFloat(this.model.num_veins) ) * prev_vein,
        origin_z : 0,
        tip_x : (v == 0 || v == 1) ? 0 : parseFloat(this.model.vein_length),
        tip_y : (parseFloat(this.model.length) / parseFloat(this.model.num_veins)) * prev_vein,
        tip_z : 0
      }
      next_vein = {
        origin_x : 0,
        origin_y : (parseFloat(this.model.length) / parseFloat(this.model.num_veins) ) * next_vein,
        origin_z : 0,
        tip_x : (v == 0 || v == 1) ? 0 : parseFloat(this.model.vein_length),
        tip_y : (parseFloat(this.model.length) / parseFloat(this.model.num_veins) ) * next_vein,
        tip_z : 0
      }

      var origin_mid = this.midpoint(
          prev_vein.origin_x, prev_vein.origin_y,
          next_vein.origin_x, next_vein.origin_y,
          vein_t
      )
      var tip_mid = this.midpoint(
          prev_vein.tip_x, prev_vein.tip_y,
          next_vein.tip_x, next_vein.tip_y,
          vein_t
      )

      //console.log("vein", [u, v], vein_position, prev_vein, next_vein, vein_t);
      var point = this.midpoint(origin_mid[0], origin_mid[1], tip_mid[0], tip_mid[1], u)
      var x = point[0];
      var y = point[1];
      var z = 0;
      console.log(vein_t, origin_mid, tip_mid);
      target.set(x, y, z);
    },
    midpoint : function (lat1, long1, lat2, long2, per) {
         return [lat1 + (lat2 - lat1) * per, long1 + (long2 - long1) * per];
    }
  },
  computed: {
    inst() {
      return new ParametricBufferGeometry(
        this.leafFunction, 10, 10
      );
    },
  },
};
