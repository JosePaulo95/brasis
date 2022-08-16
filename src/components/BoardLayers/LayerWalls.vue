<template>
  <div
    v-if="cell.value"
    :class="`wall-sprite wall-sprite-${cell.value}`"
  >
  </div>
</template>

<script lang="ts">
  import WallLayerModel from '@/Brasis/models/WallLayerModel';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LayerWall',
    props: {
      cell: {
        type: WallLayerModel,
        required: true
      },
    }
  });
</script>

<style scoped>
.wall-sprite{
  z-index: 3;
  background-size: contain;
}
</style>
