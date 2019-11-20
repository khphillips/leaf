<template>
  <vgl-perspective-camera :name="name" ref="camera" orbit-target="0 0 0" :zoom="model.zoom" :position="model.position"></vgl-perspective-camera>
</template>
<script>

import CameraModel from '@/models/Camera';

export default {
    props: ['value', 'name'],
    data: () => ({
      model : {}
    }),
    computed: {

    },
    methods: {
      handleInput (e) {
        this.$emit('input', this.model)
      },
    },
    mounted: function() {
      this.model = this.value;
    },
    components: {

    },
};
</script>
<style>
</style>