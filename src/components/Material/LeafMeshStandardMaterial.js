import { MeshStandardMaterial } from 'three';
import { DoubleSide } from 'three';
import { VglMaterialWithMap } from 'vue-gl/src/mixins';
import { string } from 'vue-gl/src/validators';
import { boolean } from 'vue-gl/src/validators';
import { number } from 'vue-gl/src/validators';

/**
 * A standard physically based material,
 * corresponding [THREE.MeshStandardMaterial](https://threejs.org/docs/index.html#api/materials/MeshStandardMaterial).
 * Using Metallic-Roughness workflow.
 *
 * Properties of [VglMaterial](vgl-material) are also available as mixin.
 */

export default {
  mixins: [VglMaterialWithMap],
  props: {
    /** CSS style color of the material. */
    color: { type: string, default: '#00dd99' },
    /** The color map of the material. */
    //map: string,
    skinning : { type: boolean, default: true },
    emissive : { type: string, default: '#000000' },
    side : { type: number, default: 0 },
    flatShading : { type: boolean, default: false },
    dithering : { type: boolean, default: true },
    roughness : { type: number, default: .455 },
    metalness : { type: number, default: .3 },
    polygonOffset : { type: boolean, default: true },
    polygonOffsetFactor : { type: number, default: 1 },
    polygonOffsetUnits : { type: number, default: 1 },
    visible : { type: boolean, default: true },
    wireframe: { type: boolean, default: false },
  },
  computed: {
    inst: () => new MeshStandardMaterial(),
  },
  watch: {
    inst: {
      handler(inst) { 
        inst.color.setStyle(this.color); 
        inst.emissive.setStyle(this.emissive); 
        inst.setValues({
          skinning : this.skinning,
          side : this.side,
          flatShading : this.flatShading,
          dithering : this.dithering,
          roughness : parseFloat(this.roughness),
          metalness : parseFloat(this.metalness),
          polygonOffset : this.polygonOffset,
          polygonOffsetFactor : parseInt(this.polygonOffsetFactor),
          polygonOffsetUnits : parseInt(this.polygonOffsetUnits),
          visible : this.visible,
          wireframe : this.wireframe,
        });
      },
      immediate: true,
    },
    color(color) { this.inst.color.setStyle(color); },
    map(map) {this.inst.map = map},
    roughness(value) {this.inst.roughness = value},
    metalness(value) {this.inst.metalness = value},
    visible(value) {this.inst.visible = value},
  },
};
