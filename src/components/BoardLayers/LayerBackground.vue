<template>
  <img class="cell-content" v-bind:src="getBackgroundSprite('bg', cell.value)" alt="" />
</template>

<script lang="ts">
  import BgLayerModel from '@/Brasis/models/BgLayerModel';
import { getBackgroundSprite } from '@/Brasis/views';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LayerBackground',
    props: {
      cell: {
        type: BgLayerModel,
        required: true
      },
    },
    methods: {
      getBackgroundSprite: getBackgroundSprite
    }
  });
</script>


<style scoped>
  
</style>
