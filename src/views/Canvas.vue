<template>
    <v-layout
      text-center
      wrap
    >
      <v-flex>
        <div id="ThreeDScene">

          <vgl-renderer antialias style="height: 80vh; width:100vw;">
              <vgl-scene>
                <vgl-grid-helper></vgl-grid-helper>
                <vgl-axes-helper></vgl-axes-helper>
                
                <leaf-box-geometry v-model="boxes" name="leafbox"></leaf-box-geometry>
                <leaf-blade-geometry v-model="blades" name="leafblade"></leaf-blade-geometry>
                
                <leaf-mesh-standard-material name="green"></leaf-mesh-standard-material>
                <leaf-mesh-standard-material color="#ffffff" :wireframe="true" name="green-wire"></leaf-mesh-standard-material>

                <vgl-group v-for="(i, k) in boxes" :key="k" :position="i.position" :rotation="i.rotation">
                  <vgl-mesh :geometry="'leafbox_' + k" material="green"></vgl-mesh>   
                  <vgl-mesh :geometry="'leafbox_' + k" material="green-wire"></vgl-mesh> 
                </vgl-group>

                <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
                <vgl-directional-light position="0 25 25"></vgl-directional-light>

              </vgl-scene>
            <vgl-perspective-camera orbit-target="0 0 0" zoom="1" position="-3 10 20;"></vgl-perspective-camera>
          </vgl-renderer>

        </div>
      </v-flex>

    </v-layout>
</template>

<script>

import BoxModel from '@/models/Box';
import LeafBladeModel from '@/models/LeafBlade';

import LeafBoxGeometry from '@/components/Geometry/LeafBoxGeometry';
import LeafBladeGeometry from '@/components/Geometry/LeafBladeGeometry.vue';
import LeafMeshStandardMaterial from '@/components/Material/LeafMeshStandardMaterial'

export default {
  data: () => ({

  }),
  computed : {
    boxes : function(){
      return BoxModel.all();
    },
    blades : function(){
      console.log(LeafBladeModel)
      return LeafBladeModel.all();
    }
  },
  mounted : function(){
    
  },
  components: {
    LeafBoxGeometry,
    LeafMeshStandardMaterial,
    LeafBladeGeometry
  },
};
</script>

<style>
</style>
