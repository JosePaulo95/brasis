<template>
  <img class="cell-content transparent" v-bind:src="getBackgroundSprite('board-hud', cell.value)" alt="" />
</template>

<script lang="ts">
  import HUDLayerModel from '@/Brasis/models/HUDLayerModel';
import { getBackgroundSprite } from '@/Brasis/views';
import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LayerHUD',
    props: {
      cell: {
        type: HUDLayerModel,
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
