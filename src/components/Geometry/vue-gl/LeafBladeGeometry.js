import LeafBlade from '../utils/LeafBlade';
import VglGeometry from 'vue-gl/src/core/vgl-geometry';
import { number } from 'vue-gl/src/validators';

/**
 * This is the quadrilateral primitive geometry component,
 * corresponding [THREE.BoxGeometry](https://threejs.org/docs/index.html#api/geometries/BoxGeometry).
 *
 * Properties of [VglGeometry](vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: ['model', 'name'],
  computed: {
    inst() {
      var ref = new LeafBlade(this.model, this.name);
      return ref.createLeafBladeGeometry()
    },
  },
};
