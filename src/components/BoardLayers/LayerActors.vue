<template>
  <img class="cell-content" v-bind:src="getBackgroundSprite('actors', cell.value)" alt="" />
</template>

<script lang="ts">
  import ActorLayerModel from '@/Brasis/models/ActorLayerModel';
import { getBackgroundSprite } from '@/Brasis/views';
import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LayerActors',
    props: {
      cell: {
        type: ActorLayerModel,
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
