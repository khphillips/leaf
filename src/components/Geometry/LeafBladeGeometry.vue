<template>
  <div>
    <leaf-blade-geometry
      :name="name"
      :model="geometry"
    ></leaf-blade-geometry>
  </div>
</template>
<script>

import LeafBladeModel from '@/models/LeafBlade';
import LeafBladeGeometry from './vue-gl/LeafBladeGeometry'

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
      console.log(this.value)
      this.geometry = this.value;
    },
    components: {
      LeafBladeGeometry
    },
};
</script>
<style>
</style>