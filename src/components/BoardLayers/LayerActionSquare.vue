<template>
  <div
    v-if="cell.value"
    :class="`transparent action-square-sprite action-square-sprite-${cell.value}`"
  >
  </div>
</template>

<script lang="ts">
  import ActionSquareLayerModel from '@/Brasis/models/ActionSquareLayerModel';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LayerActionSquare',
    props: {
      cell: {
        type: ActionSquareLayerModel,
        required: true
      },
    }
  });
</script>


<style scoped>
  .transparent {
    opacity: 0.5;
  }
  .action-square-sprite{
    z-index: 3;
    background-size: contain;
  }
</style>
