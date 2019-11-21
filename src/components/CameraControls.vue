<template>
  <div>
    <div v-if="camera">
      <h4>Target</h4>
      <v-slider :max="100" :min="-100" label="Target X" v-on:change="updateCamera" v-model="camera.target_x"></v-slider>
      <v-slider :max="100" :min="-100" label="Target Y" v-on:change="updateCamera" v-model="camera.target_y"></v-slider>
      <v-slider :max="100" :min="-100" label="Target Z" v-on:change="updateCamera" v-model="camera.target_z"></v-slider>
      <h4>Position</h4>
      <v-slider :max="100" :min="-100" label="X" v-on:change="updateCamera" v-model="camera.x"></v-slider>
      <v-slider :max="100" :min="-100" label="Y" v-on:change="updateCamera" v-model="camera.y"></v-slider>
      <v-slider :max="100" :min="-100" label="Z" v-on:change="updateCamera" v-model="camera.z"></v-slider>
    </div>
  </div>
</template>

<script>

  import CameraModel from '@/models/Camera'

  export default {
      props: ['value'],
      data : function() {
        return { 
        }
      },
      mounted : function(){

      },
      computed : {
        camera : function(){
          return CameraModel.query().where('id', this.value).first();
        }
      },
      methods: {
        updateCamera : function(){
          CameraModel.update({
              where : this.value,
              data : this.camera
            })
        }
      }
  }
</script>

<style>

</style>