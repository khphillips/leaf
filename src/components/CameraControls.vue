<template>
  <div>
    <v-text-field label="Target X" v-model="camera.target_x"></v-text-field>
    <v-text-field label="Target Y" v-model="camera.target_y"></v-text-field>
    <v-text-field label="Target Z" v-model="camera.target_z"></v-text-field>
    {{ camera }}
  </div>
</template>

<script>

  import CameraModel from '@/models/Camera'

  export default {
      props: ['value'],
      data : function() {
        return { 
          camera : {
            "x": 1,
            "y": 1,
            "z": 10,
            "rotate_x": 0,
            "rotate_y": 0,
            "rotate_z": 0,
            "target_x": 0,
            "target_y": 5,
            "target_z": 0,
            "zoom": 1,
            "fov": 25
          }
        }
      },
      mounted : function(){
        this.camera = CameraModel.query().where('id', 1).first();
        console.log('camera', this.camera)
      },
      computed : {

      },
      methods: {

      },
      watchers : {
        'camera' : {
          deep : true,
          handler : function(){
            console.log(newV)
            CameraModel.update({
              where : 1,
              data : camera
            })
          }
        }
      }
  }
</script>

<style>

</style>