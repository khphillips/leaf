<template>
  <div>
    <leaf-blade-geometry v-for="(i, k) in geometry"
      :key="k"
      :name="name + '_' + k"
      :model="i"
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
      this.geometry = this.value;
    },
    components: {
      LeafBladeGeometry
    },
};
</script>
<style>
</style>