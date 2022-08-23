<template>
  <div
    :class="`cell-content terrain-sprite terrain-sprite-${cell.value}`"
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
.terrain-sprite{
  background-size: contain;
}
</style>
