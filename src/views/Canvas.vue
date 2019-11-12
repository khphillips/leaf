<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Canvas
        </h1>
        <div id="ThreeDScene"></div>
      </v-flex>

      
    </v-layout>
  </v-container>
</template>

<script>

import Scene from '../components/3djs/Scene.js';
import Config from '../components/config'

const theScene = new Scene('ThreeDScene');

export default {
  data: () => ({
    menu : false,
    config : Config
  }),
  mounted : function(){
    if (!theScene.did_init){
      theScene.init(Config);
    }
    
  },
  components: {

  },
};
</script>

<style>
#ThreeDScene{
  height: 90vh;
  width: 100%;
}
</style>
