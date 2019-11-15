<template>
  <div>
    <vgl-box-geometry v-for="(i, k) in geometry"
      :key="k"
      :name="name + '_' + k"
      :width="i.width" 
      :height="i.height" 
      :depth="i.depth" 
      :width-segments="i.width_segments" 
      :height-segments="i.height_segments" 
      :depth-segments="i.depth_segments"  
    ></vgl-box-geometry>
  </div>
</template>
<script>

import BoxModel from '@/models/Box';

export default {
    props: ['value', 'name'],
    data: () => ({
      geometry : {}
    }),
    computed: {

    },
    methods: {
      handleInput (e) {
        this.$emit('input', this.geometry)
      },
    },
    mounted: function() {
      this.geometry = this.value;
    },
    components: {

    },
};
</script>
<style>
</style>