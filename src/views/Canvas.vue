<template>
    <v-layout
      text-center
      wrap
    >
      <v-flex v-if="blades[0]">
        <div id="ThreeDScene">

          <vgl-renderer ref="renderer" antialias style="height: 80vh; width:100vw;">
              <vgl-scene>
                <vgl-grid-helper></vgl-grid-helper>
                <vgl-axes-helper></vgl-axes-helper>
                
                <leaf-box-geometry v-model="boxes" name="leafbox"></leaf-box-geometry>
                <leaf-blade-geometry name="leafblade" :model="blade_ref"></leaf-blade-geometry>
                
                <leaf-mesh-standard-material name="green"></leaf-mesh-standard-material>
                <leaf-mesh-standard-material color="#ffffff" :wireframe="true" name="green-wire"></leaf-mesh-standard-material>

                <vgl-group>
                  <vgl-group v-for="(i, k) in blades" :key="k" :position="i.position" :rotation="i.rotation">
                    <vgl-mesh geometry="leafblade" material="green"></vgl-mesh>   
                    <vgl-mesh geometry="leafblade" material="green-wire"></vgl-mesh>   
                  </vgl-group>
                </vgl-group>

                <vgl-group>
                  <vgl-group v-for="(i, k) in boxes" :key="k" :position="i.position" :rotation="i.rotation">
                    <vgl-mesh :geometry="'leafbox_' + k" material="green"></vgl-mesh>   
                    <vgl-mesh :geometry="'leafbox_' + k" material="green-wire"></vgl-mesh> 
                  </vgl-group>
                </vgl-group>

                <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
                <vgl-directional-light position="0 25 25"></vgl-directional-light>
                
              </vgl-scene>
              <vgl-perspective-camera :name="camera.name" ref="camera" :orbit-target="camera.orbitTarget" :zoom="camera.zoom" :position="camera.position"></vgl-perspective-camera>
          </vgl-renderer>

        </div>
      </v-flex>
      <v-btn @click="animate = !animate">Animate</v-btn>
    </v-layout>
</template>

<script>

import BoxModel from '@/models/Box';
import CameraModel from '@/models/Camera';
import LeafBladeModel from '@/models/LeafBlade';
import LeafBoxGeometry from '@/components/Geometry/LeafBoxGeometry';
import Camera from '@/components/Geometry/Camera';
import LeafBladeGeometry from '@/components/Geometry/vue-gl/LeafBladeGeometry';
import LeafMeshStandardMaterial from '@/components/Material/LeafMeshStandardMaterial'
import * as THREE from 'three';

import vglNamespace from 'vue-gl/src/core/vgl-namespace';

export default {
  data: () => ({
    animating : false,
  }),
  computed : {
    camera : function(){
      return CameraModel.query().where('id', 1).first();
    },
    boxes : function(){
      return BoxModel.all();
    },
    blades : function(){
      return LeafBladeModel.all();
    },
    blade_ref : function(){
      return this.blades[0]
    }
  },
  mounted : function(){
    setInterval(this.timeline, 33)
  },
  components: {
    LeafBoxGeometry,
    LeafMeshStandardMaterial,
    LeafBladeGeometry,
    Camera
  },
  methods: {
    timeline : function(){
      if (this.animate){
        this.boxes[0].x = this.boxes[0].x + .1
        BoxModel.update({
          where: 1,
          data: {
            x : this.boxes[0].x
          }
        })
      }
    }
  },
  watch : {
    'blade_ref' : function(newV){
      console.log('blade updated')

    }
  }
};
</script>

<style>
</style>
