<template>
  <div>
    <div v-if="blade">
      <h4>Leaf Blade</h4>
      <v-text-field label="vein_length_curve_x1" v-on:change="updateBlade" v-model="blade.vein_length_curve_x1"></v-text-field>
    </div>
  </div>
</template>

<script>

  import LeafBladeModel from '@/models/LeafBlade'

  export default {
      props: ['value'],
      data : function() {
        return { 
        }
      },
      mounted : function(){

      },
      computed : {
        blade : function(){
          return LeafBladeModel.query().where('id', 1).first();
        }
      },
      methods: {
        'updateBlade' : function(){
          LeafBladeModel.update({
              where : 1,
              data : this.blade
            })
        }
      }
  }
</script>

<style>

</style>