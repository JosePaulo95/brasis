<template>
  <img class="cell-content transparent" v-bind:src="getBackgroundSprite('action-square', cell.value)" alt="" />
</template>

<script lang="ts">
  import ActionSquareLayerModel from '@/Brasis/models/ActionSquareLayerModel';
  import { getBackgroundSprite } from '@/Brasis/views';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LayerActionSquare',
    props: {
      cell: {
        type: ActionSquareLayerModel,
        required: true
      },
    },
    methods: {
      getBackgroundSprite: getBackgroundSprite
    }
  });
</script>


<style scoped>
  .transparent {
    opacity: 0.5;
  }
</style>
