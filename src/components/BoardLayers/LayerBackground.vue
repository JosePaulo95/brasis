<template>
  <div
    
  >
  </div>
</template>

<script lang="ts">
  import BgLayerModel from '@/Brasis/models/BgLayerModel';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LayerBackground',
    props: {
      cell: {
        type: BgLayerModel,
        required: true
      },
    }
  });
</script>


<style scoped>
  
</style>
